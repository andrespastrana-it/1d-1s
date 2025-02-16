import { z } from "zod";

const storySchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  main_character: z.string(),
  historical_event: z.string(),
  location: z.string(),
  summary: z.string(),
  full_story: z.string(),
  motivational_message: z.string(),
  metadata: z.object({
    themes: z.array(z.string()),
    keywords: z.array(z.string()),
    verified: z.boolean(),
  }),
  ui_metadata: z.object({
    background_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    font: z.string(),
    text_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    highlight_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    image: z.string().url(),
  }),
});


export type Story = z.infer<typeof storySchema>;

export const validateStory = (data: unknown) => {
  const result = storySchema.safeParse(data);
  if (result.success) {
    return result.data;
  }  
  throw new Error(`Invalid story data ${ result.error.format()}`)


};