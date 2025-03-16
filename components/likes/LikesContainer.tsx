import { get_story_like_initial } from "@/lib/data-access-layer";
import { Likes } from "./Likes";

// This is a server component to fetch the initial like status
export async function LikeContainer({ storyId }: { storyId: string }) {
  // Get initial like count and status
  const { isLiked, likeCount } = await get_story_like_initial(storyId);

  return (
    <Likes
      storyId={storyId}
      initialLikes={likeCount}
      initialIsLiked={isLiked}
    />
  );
}
