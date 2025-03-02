import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { StoryEntity } from "@/lib/types";
import Image from "next/image";

interface StoryCardProps {
  story: StoryEntity;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={story.ui_metadata.image || "/placeholder.svg"}
          alt={story.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{story.metadata.themes[0]}</Badge>
          <span className="text-xs text-muted-foreground">
            <CalendarIcon className="inline-block w-3 h-3 mr-1" />
            {story.date}
          </span>
        </div>
        <CardTitle className="line-clamp-2">{story.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {story.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon className="w-4 h-4" />
          <span>{story.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap gap-1">
          {story.metadata.keywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="outline">
              {keyword}
            </Badge>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/stories/${story.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
