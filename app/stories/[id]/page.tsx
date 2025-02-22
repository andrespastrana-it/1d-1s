import StoryDetails from "@/components/story-details";
import { get_story_by_id } from "@/lib/actions";
import type { StoryEntity } from "@/lib/types";

export default async function StoryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Now this works because params is a Promise
  const data = await get_story_by_id(id);

  const { ui_metadata } = data as StoryEntity;

  const pageStyle = {
    backgroundColor: ui_metadata.background_color,
    color: ui_metadata.text_color,
    fontFamily: ui_metadata.font,
  };

  return (
    <div className="min-h-screen py-8" style={pageStyle}>
      <StoryDetails story={data} />
    </div>
  );
}
