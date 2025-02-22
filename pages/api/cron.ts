import Cors from "cors";
import { Story } from "@/lib/models";
import { validateStory } from "@/lib/validations";
import { create_story_ai, getPaginatedStoriesMetadata, isStoryDuplicated } from "@/lib/actions";
import type { NextApiRequest, NextApiResponse } from "next";


/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */


// Initialize the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET"],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.time("answer time");

    // Run the middleware
    await runMiddleware(req, res, cors);

    const CRON_KEY = process.env.CRON_SECRET;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    // Validate the authorization headers
    if (!CRON_KEY || req.headers.authorization !== CRON_KEY || !OPENAI_API_KEY) {
      return res.status(401).json({ success: false, error: "Unauthorized: Invalid credentials or missing API key" });
    }

    let isReadyToSave = false;
    let uniqueStory = null;
    let attemptCount = 0; 
     const maxAttempts =3
    // Add a counter to track attempts

    // Limit attempts to 3 for generating a unique, non-duplicated story
    while (!isReadyToSave && attemptCount < maxAttempts) {
      attemptCount++;

      const usedStories = await getPaginatedStoriesMetadata({ page: 1, pageSize: 10 });
      const newStoryFromAi = await create_story_ai(OPENAI_API_KEY, usedStories);

      const validatedStoryShape = validateStory(newStoryFromAi);

      // Check if the story is duplicated in the database
      const isDuplicated = await isStoryDuplicated(validatedStoryShape);
      if (!isDuplicated) {
        isReadyToSave = true;
        uniqueStory = validatedStoryShape;
      }

      console.log(`Attempt ${attemptCount}: ${isDuplicated ? "Duplicate found" : "Unique story found"}`);
    }

    if (uniqueStory && isReadyToSave) {
      const storyModel = new Story(uniqueStory);
      await storyModel.save();
      console.timeEnd("answer time");

      return res.json({ success: true, error: false, data: uniqueStory });
    }

    // If we reach the maximum number of attempts and still don't have a valid story, return an error
    console.timeEnd("answer time");
    return res.json({ success: false, error: "Error creating new history after 3 attempts", data: null });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ success: false, error: "Internal server error. Please try again later." });
  }
}
