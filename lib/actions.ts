"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  // Define each criteria with its name, function, and the fields it checks.
  // TODO: Refactor
  const criteria = [
    {
      name: "checkTitleDateCharacter",
      fn: storyCriteriaChecks.checkTitleDateCharacter,
      fields: ["title", "date", "main_character"],
    },
    {
      name: "checkEventLocation",
      fn: storyCriteriaChecks.checkEventLocation,
      fields: ["historical_event", "location"],
    },
    {
      name: "checkTitleKeywords",
      fn: storyCriteriaChecks.checkTitleKeywords,
      fields: ["title", "metadata.keywords"],
    },
    {
      name: "checkTitleMotivationalMessage",
      fn: storyCriteriaChecks.checkTitleMotivationalMessage,
      fields: ["title", "motivational_message"],
    },
    {
      name: "checkLocationSummary",
      fn: storyCriteriaChecks.checkLocationSummary,
      fields: ["location", "summary"],
    },
    {
      name: "checkKeywordsMainCharacter",
      fn: storyCriteriaChecks.checkKeywordsMainCharacter,
      fields: ["main_character", "metadata.keywords"],
    },
    {
      name: "checkTitleFullStory",
      fn: storyCriteriaChecks.checkTitleFullStory,
      fields: ["title", "full_story"],
    },
    {
      name: "checkEventMotivationalMessage",
      fn: storyCriteriaChecks.checkEventMotivationalMessage,
      fields: ["historical_event", "motivational_message"],
    },
    {
      name: "checkEventLocationSummary",
      fn: storyCriteriaChecks.checkEventLocationSummary,
      fields: ["historical_event", "location", "summary"],
    },
    {
      name: "checkDateKeywords",
      fn: storyCriteriaChecks.checkDateKeywords,
      fields: ["date", "metadata.keywords"],
    },
    {
      name: "checkEventLocationMessage",
      fn: storyCriteriaChecks.checkEventLocationMessage,
      fields: ["historical_event", "location", "motivational_message"],
    },
  ];

  // Execute all criteria functions in parallel.
  const results = await Promise.all(criteria.map(item => item.fn(story)));

  // Log the details of any criteria that returned true (i.e. a duplicate was detected)
  results.forEach((result, index) => {
    if (result) {
      const { name, fields } = criteria[index];

      // Build an object mapping field names to their values.
      const failedFields = fields.reduce<Record<string, unknown>>((acc, field) => {
        // Support nested fields using dot-notation.
        const value = field
          .split('.')
          .reduce((obj: Record<string, any>, key: string) => obj[key], story as Record<string, any>);
        acc[field] = value;
        return acc;
      }, {});
      console.log(`Criteria "${name}" detected a duplicate with the following fields:`, failedFields);
    }
  });

  // Return true if any of the criteria checks returned true.
  return results.some(result => result === true);
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
export const create_story_ai = async (key: string, metadata: StoryMetadataForPrompt[]): Promise<unknown> => {
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

// All the functions to recive a sort filter 
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
