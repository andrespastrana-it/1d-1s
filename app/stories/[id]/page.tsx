import StoryDetails from "@/components/story-details";
import type { Story } from "@/lib/types";

export default async function StoryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Now this works because params is a Promise

  const NEXT_HOST = process.env.NEXT_HOST;

  // Get the story details
  const resp = await fetch(`${NEXT_HOST}api/stories/${id}`);

  const { data } = await resp.json();
  const { ui_metadata } = data as Story;

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
