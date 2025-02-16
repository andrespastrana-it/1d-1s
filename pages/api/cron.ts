import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
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
  // Run the middleware
  await runMiddleware(req, res, cors);
  console.log("Cron job received in the client");
  
  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
}
