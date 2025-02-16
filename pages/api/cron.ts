import type { NextApiRequest, NextApiResponse } from "next";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import Cors from "cors";
import { getStoryGenerationPrompt } from "@/lib/openai";
import { validateStory } from "@/lib/validations";
import { Story } from "@/lib/models";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Initialize the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET"],
});

// Define an explicit type for the middleware function
type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result: any) => void
) => void;

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction
): Promise<unknown> {
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
       // Run the middleware
  await runMiddleware(req, res, cors);
  const CRON_KEY = process.env.CRON_SECRET;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!CRON_KEY || req.headers.authorization !== CRON_KEY || !OPENAI_API_KEY) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }


  // Generate the story using OPEN AI
  const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
    compatibility: "strict",
  });

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: getStoryGenerationPrompt(),
  });  

  
//  Parse the string into an object
  const parsedObjectStory = JSON.parse(text)


  // Validate the story shape
  const story = validateStory(parsedObjectStory) 

 
  

    

  //  Check that the history is not duplicated


// Save it into the database
const storyModel = new Story(story);
await storyModel.save();
console.log("NEW STORY CREATE SUCCESSFULLY");

// Response
return res.json({ success: true, error: false, data: storyModel });
  
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({error})
  }
}



