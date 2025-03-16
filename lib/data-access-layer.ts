"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { CommentEntity, FormComments } from "./types";
import { z } from "zod";
import { Comment, Story } from "./models";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

// this server action is used to create a comment
export const create_comment = async (
  prevState: FormComments,
  formData: FormData
) => {
  // Protect server actions with authentication
  const user = await currentUser();

  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    redirectToSignIn();
  }

  const rawData = {
    comment: formData.get("comment") as string,
    storyId: formData.get("storyId") as string,
  };

  // Validate the form data
  const commentFormSchema = z.object({
    comment: z.string().min(10, "Comment must be at least 10 characters long"),
    storyId: z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
      message: "Invalid StoryId",
    }),
  });

  const parsedData = commentFormSchema.safeParse({
    comment: formData.get("comment") as string,
    storyId: formData.get("storyId") as string,
  });

  if (!parsedData.success) {
    const resp: FormComments = {
      msg: "Fix all the errors before continue",
      inputs: rawData,
      errors: parsedData.error.flatten().fieldErrors,
      success: false,
    };
    return resp;
  }

  // TODO: Validate the storyId

  // Create the new comment
  const dbData = {
    storyId: rawData.storyId,
    commenter: `${user?.firstName} ${user?.lastName}`,
    content: rawData.comment,
  };
  const newComment = new Comment({ ...dbData });

  await newComment.save();
  revalidatePath(`/stories/${rawData.storyId}`);
  return {
    msg: "Comment created successfully",
    inputs: rawData,
    errors: { comment: [] },
    success: true,
  };
};

// this is a server action to get all comments for a story
export const get_comments = async (
  storyId: string
): Promise<CommentEntity[]> => {
  const storyComments = await Comment.find({
    storyId,
  });
  return storyComments.map((obj) => obj.toJSON()) as CommentEntity[];
};

// this is a server action to handle story like
export const handle_story_like = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const storyId = formData.get("storyId") as string;

    // Protect server action with authentication
    const { userId } = await auth();
    if (!userId) {
      return {
        isLiked: false,
        likeCount: 0,
        authenticated: false,
        success: false,
        message: "Authentication required",
      };
    }

    // Validate storyId format
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return {
        isLiked: false,
        likeCount: 0,
        success: false,
        error: "Invalid story ID format",
      };
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return {
        isLiked: false,
        likeCount: 0,
        success: false,
        error: "Story not found",
      };
    }

    const userLikes = story?.likes || [];
    const userIndex = userLikes.indexOf(userId);
    const isCurrentlyLiked = userIndex > -1;

    // Always toggle the like status
    if (isCurrentlyLiked) {
      // User already liked the story, so unlike it
      userLikes.splice(userIndex, 1);
      story.likes = userLikes;
    } else {
      // User hasn't liked the story, so add the like
      story.likes.push(userId);
    }

    await story.save();

    // Revalidate the story page to reflect the updated like status
    revalidatePath(`/stories/${storyId}`);

    // Return the updated like status
    return {
      isLiked: !isCurrentlyLiked, // Toggled state
      likeCount: story.likes.length, // Add the count here
      authenticated: true,
      success: true,
      message: isCurrentlyLiked
        ? "Story unliked successfully"
        : "Story liked successfully",
    };
  } catch (error) {
    console.error("Error handling story like:", error);
    return {
      isLiked: false,
      likeCount: 0,
      success: false,
      error: "Failed to process like action",
    };
  }
};

// Get initial like status and count for a story
export const get_story_like_initial = async (
  storyId: string
): Promise<{ isLiked: boolean; likeCount: number }> => {
  try {
    // Validate storyId format
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return { isLiked: false, likeCount: 0 };
    }

    const { userId } = await auth();
    const story = await Story.findById(storyId).select("likes").lean();

    if (!story) {
      return { isLiked: false, likeCount: 0 };
    }

    const likes = story.likes || [];
    return {
      isLiked: userId ? likes.includes(userId) : false,
      likeCount: likes.length,
    };
  } catch (error) {
    console.error("Error getting initial like status:", error);
    return { isLiked: false, likeCount: 0 };
  }
};
