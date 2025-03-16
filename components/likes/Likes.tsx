"use client";
import { Heart } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { handle_story_like } from "@/lib/data-access-layer";
import { useAuth } from "@clerk/nextjs";

const initialState = {
  isLiked: false,
  likeCount: 0,
  authenticated: false,
  success: false,
  message: "",
};

export const Likes = ({
  storyId,
  initialLikes = 0,
  initialIsLiked = false,
}: {
  storyId: string;
  initialLikes?: number;
  initialIsLiked?: boolean;
}) => {
  const [formState, formAction] = useActionState(handle_story_like, {
    ...initialState,
    likeCount: initialLikes,
    isLiked: initialIsLiked,
  });
  const { isSignedIn } = useAuth();

  // Use local state to show immediate feedback
  const [displayLikeCount, setDisplayLikeCount] = useState(initialLikes);

  // Update local state when form state changes
  useEffect(() => {
    if (formState?.success && formState.likeCount !== undefined) {
      setDisplayLikeCount(formState.likeCount);
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <input type="hidden" value={storyId} name="storyId" />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 rounded-full px-4 py-2 transition-all duration-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 group"
        disabled={!isSignedIn}
        title={
          !isSignedIn
            ? "Sign in to like this story"
            : formState.isLiked
            ? "Unlike this story"
            : "Like this story"
        }
      >
        <Heart
          className={`h-5 w-5 transition-all duration-300 ease-in-out ${
            formState.isLiked
              ? "fill-rose-500 text-rose-500 scale-110"
              : "text-rose-400 group-hover:text-rose-500"
          } group-hover:scale-105`}
        />
        <span
          className={`ml-1.5 font-medium transition-colors duration-300 ${
            formState.isLiked
              ? "text-rose-500"
              : "text-muted-foreground group-hover:text-rose-500"
          }`}
        >
          {displayLikeCount}
        </span>
      </Button>
    </form>
  );
};
