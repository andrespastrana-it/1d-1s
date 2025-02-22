import { z } from "zod";

const storySchema = z.object({
  title: z.string().min(3).max(100),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  main_character: z.string().min(1).max(50),
  historical_event: z.string().min(1).max(100),
  location: z.string(),  // Assuming optional for now, modify if needed
  summary: z.string().min(10).max(500),
  full_story: z.string().min(50).max(5000),
  motivational_message: z.string().min(10).max(300),
  metadata: z.object({
    themes: z.array(z.string()).min(1),
    keywords: z.array(z.string()).min(1).max(50),
    verified: z.boolean(),
  }),
  ui_metadata: z.object({
    background_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    font: z.string().min(3).max(50),
    text_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    highlight_color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    image: z.string().url().refine((url) => /\.(jpg|jpeg|png|gif)$/i.test(url), {
      message: "Invalid image URL",
    }),
  }),
});



export type Story = z.infer<typeof storySchema>;

export const validateStory = (data: unknown) => {
  const result = storySchema.safeParse(data);
  if (result.success) {
    return result.data as Story;
  }  
  
  throw new Error(`Invalid story data ${ result.error.format()}`)


};