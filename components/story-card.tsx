import Link from "next/link";
import type { StoryEntity } from "@/lib/types";
export function StoryCard({ story }: { story: StoryEntity }) {
  const { ui_metadata, title, date, summary, id } = story;

  const cardStyle = {
    backgroundColor: ui_metadata.background_color,
    color: ui_metadata.text_color,
    fontFamily: ui_metadata.font,
  };

  return (
    <Link href={`/stories/${id}`}>
      <div
        className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        style={cardStyle}
      >
        {/* <Image
          src={ui_metadata.image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        /> */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-sm mb-2">{date}</p>
          <p className="text-sm">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
