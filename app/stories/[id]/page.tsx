"use server";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ArrowLeft,
  CalendarIcon,
  MapPinIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Toaster } from "@/components/ui/toaster";
import { AIBanner } from "@/components/ai-banner";

import { get_story_by_id } from "@/lib/actions";
import Image from "next/image";
import { NewCommentForm } from "@/components/comments/new-comment-form";
import { Comments } from "@/components/comments/comments";
import { Suspense } from "react";
import { LikeContainer } from "@/components/likes/LikesContainer";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await get_story_by_id(id);

  return (
    <div className="container py-8 md:py-12">
      <Toaster />
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/stories" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Stories
        </Link>
      </Button>

      <AIBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{story.metadata.themes[0]}</Badge>
              <span className="text-sm text-muted-foreground">
                <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                {story.date}
              </span>
              <span className="text-sm text-muted-foreground">
                <MapPinIcon className="inline-block w-4 h-4 mr-1" />
                {story.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {story.title}
            </h1>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <Image
              width={800}
              height={500}
              src={story.ui_metadata.image || "/placeholder.svg"}
              alt={story.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {story.full_story.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-6">
              {/* Likes */}
              <LikeContainer storyId={id} />
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
                <span>{[].length}</span>
              </button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="w-full"
                    >
                      <a
                        // href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        //   window.location.href
                        // )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="ml-2">Facebook</span>
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="w-full"
                    >
                      <a
                        // href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        //   window.location.href
                        // )}&text=${encodeURIComponent(story.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="ml-2">Twitter</span>
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="w-full"
                    >
                      <a
                        // href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        //   window.location.href
                        // )}&title=${encodeURIComponent(story.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="ml-2">LinkedIn</span>
                      </a>
                    </Button>
                  </div>
                  <Separator />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    // onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Comments ({[].length})</h2>
            <div className="flex items-start gap-4 mb-8">
              <NewCommentForm />
            </div>

            <div className="space-y-6">
              <h2>Comments </h2>
              <Suspense fallback={<div>Loading...</div>}>
                <Comments storyId={id} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Story Details</h3>
              <div className="space-y-2">
                <p>
                  <strong>Main Character:</strong> {story.main_character}
                </p>
                <p>
                  <strong>Historical Event:</strong> {story.historical_event}
                </p>
                <p>
                  <strong>Location:</strong> {story.location}
                </p>
                <p>
                  <strong>Date:</strong> {story.date}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Themes & Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {story.metadata.themes.map((theme, index) => (
                  <Badge key={index} variant="secondary">
                    {theme}
                  </Badge>
                ))}
                {story.metadata.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Motivational Message
              </h3>
              <p className="text-sm italic">{story.motivational_message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
