import { get_comments } from "@/lib/data-access-layer";
import { Card, CardContent } from "../ui/card";
// import { AvatarFallback, AvatarImage } from "../avatar";

// function getInitials(name: string): string {
//   const parts = name.split(" ");
//   let initials = "";
//   for (let i = 0; i < parts.length; i++) {
//     initials += parts[i].charAt(0).toUpperCase();
//   }
//   return initials;
// }

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export const Comments = async ({ storyId }: { storyId: string }) => {
  const comments = (await get_comments(storyId)) || [];

  if (comments.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* <AvatarFallback className="h-10 w-10 border">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.commenter
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    alt={comment.commenter}
                  />
                  <AvatarFallback>
                    {getInitials(comment.commenter)}
                  </AvatarFallback>
                </AvatarFallback> */}

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{comment.commenter}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
