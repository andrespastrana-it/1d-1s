"use client";
import { FormComments } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { PostComment } from "./post-comment-btn";
import { create_comment } from "@/lib/data-access-layer";
import { useActionState } from "react";
import { useParams } from "next/navigation";

// Use this to handle validation state
const initial_sate: FormComments = {
  errors: {
    comment: [],
  },
  inputs: {
    comment: "",
  },
};

export const NewCommentForm = () => {
  const params = useParams<{ id: string }>();
  const [state, formAction] = useActionState(create_comment, initial_sate);
  return (
    <form action={formAction} className="flex-1">
      <input type="hidden" name="storyId" value={params?.id} />
      <Textarea
        defaultValue={state.inputs.comment}
        placeholder="Add a comment..."
        name="comment"
        className={`mb-2 resize-none ${
          state.errors?.comment?.[0] ? "border-red-500" : ""
        }`}
      />
      <p className="text-red-500">{state.errors?.comment?.[0]}</p>
      <p className={`${state.success ? "text-green-500" : "text-red-500"}`}>
        {state?.msg}
      </p>
      {/* Post Button */}
      <PostComment />
      {/* Message for screen readers */}
      <p aria-live="polite" className="sr-only" role="status">
        {state.msg}
      </p>
    </form>
  );
};
