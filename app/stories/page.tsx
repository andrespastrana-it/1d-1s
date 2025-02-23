import { StoryCard } from "@/components/story-card";
import { get_all_stories } from "@/lib/actions";

export const revalidate = 3; // invalidate every hour

export default async function Page() {
  const stories = await get_all_stories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
