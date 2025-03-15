"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { CommentEntity, FormComments } from "./types";
import { z } from "zod";
import { Comment } from "./models";
import { revalidatePath } from "next/cache";

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

export const get_comments = async (
  storyId: string
): Promise<CommentEntity[]> => {
  const storyComments = await Comment.find({
    storyId,
  });
  return storyComments.map((obj) => obj.toJSON()) as CommentEntity[];
};
