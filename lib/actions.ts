"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getStoryGenerationPrompt } from "./helpers";
import { Story } from "./models";
import type { Story as StoryZod } from '@/lib/validations';
import { PaginationParams, StoryEntity, StoryMetadataForPrompt } from "./types";
import { storyCriteriaChecks } from "./queries";
import dbConnect from "./db";

// Check if a story is duplicated based on certain criteria
export const isStoryDuplicated = async (story: StoryZod): Promise<boolean> => {
  const checks = [
    storyCriteriaChecks.checkTitleDateCharacter(story),
    storyCriteriaChecks.checkEventLocation(story),
    storyCriteriaChecks.checkTitleKeywords(story),
    storyCriteriaChecks.checkTitleMotivationalMessage(story),
    storyCriteriaChecks.checkLocationSummary(story),
    storyCriteriaChecks.checkKeywordsMainCharacter(story),
    storyCriteriaChecks.checkTitleFullStory(story),
    storyCriteriaChecks.checkEventMotivationalMessage(story),
    storyCriteriaChecks.checkEventLocationSummary(story),
    storyCriteriaChecks.checkDateKeywords(story),
    storyCriteriaChecks.checkEventLocationMessage(story),
  ];

  const results = await Promise.all(checks);

  return results.some((result) => result === true);
};

// Get paginated metadata of stories
export const getPaginatedStoriesMetadata = async ({ page, pageSize }: PaginationParams): Promise<StoryMetadataForPrompt[]> => {
  try {
    await dbConnect();

    const skip = (page - 1) * pageSize;

    const stories = await Story.find({})
      .skip(skip)
      .limit(pageSize)
      .select('title metadata main_character')
      .lean();

    const storiesMetadata = stories.map((story) => {
      const { title, metadata, main_character } = story;
      return { title, keywords: metadata.keywords, main_character };
    });

    return storiesMetadata;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw new Error('Could not fetch stories from the database');
  }
};

// Create a story using AI based on provided metadata
export const create_story_ai = async (key: string, metadata: StoryMetadataForPrompt[]): Promise<any> => {
  const openai = createOpenAI({
    apiKey: key,
    compatibility: "strict",
  });

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: getStoryGenerationPrompt(metadata),
  });

  // Parse the generated story text into an object
  const parsedObjectStory = JSON.parse(text);
  return parsedObjectStory;
};

// Get all stories from the database
export async function get_all_stories(): Promise<StoryEntity[]> {
  await dbConnect();
  const stories = await Story.find();
  return stories.map((obj) => obj.toJSON()) as StoryEntity[];
}

// Get a specific story by ID
export async function get_story_by_id(id: string): Promise<StoryEntity> {
  try {
    await dbConnect();
    const story = await Story.findById(id);
    if (!story) {
      throw new Error("Story not found");
    }
    return story.toJSON() as StoryEntity;
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    throw new Error("Could not fetch the story");
  }
}
