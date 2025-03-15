"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export const PostComment = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex items-center gap-2"
      aria-disabled={pending}
      disabled={pending}
    >
      <Send className="h-4 w-4" />
      {pending ? "Posting..." : "Post Comment"}
    </Button>
  );
};
