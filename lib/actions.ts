import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getStoryGenerationPrompt } from "./helpers";
import {  Story } from "./models";
import { PaginationParams, StoryMetadataForPrompt } from "./types";
import { storyCriteriaChecks } from "./queries";



/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: Fix typo error here
export const isStoryDuplicated = async (story: any): Promise<boolean> => {
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

  // Run all checks concurrently and wait for all results
  const results = await Promise.all(checks);

  // If any check returns true, the story is considered duplicated
  return results.some((result) => result === true);
};

export const getPaginatedStoriesMetadata = async ({ page, pageSize }: PaginationParams): Promise<StoryMetadataForPrompt[]> => {
  try {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * pageSize;

    // Query the database to fetch stories with pagination
    const stories = await Story.find({})
      .skip(skip)       // Skip the first (page - 1) * pageSize documents
      .limit(pageSize)  // Limit the number of documents to pageSize
      .select('title metadata main_character')
      .lean() // Only fetch the necessary fields

    // Map the stories to the required metadata format
    const storiesMetadata = stories.map((story) => {
    const {title,metadata, main_character} = story

    return {title,keywords: metadata.keywords, main_character }
    });

    return storiesMetadata;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw new Error('Could not fetch stories from the database');
  }
};



export const create_story_ai =async(key:string,metadata: StoryMetadataForPrompt[])=>{
      // Move this to an external function
      // Generate the story using OPEN AI
      const openai = createOpenAI({
        apiKey: key,
        compatibility: "strict",
      });
    
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: getStoryGenerationPrompt(metadata),
      });  
      //  Parse the string into an object
      const parsedObjectStory = JSON.parse(text)

      return parsedObjectStory as unknown
}