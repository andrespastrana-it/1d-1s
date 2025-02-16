import { z } from "zod";

const storySchema = z.object({
  story_id: z.string(),
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
  } else {
    return { error: "Invalid story data", details: result.error.format() };
  }
};

export function getStoryGenerationPrompt() {
  const prompt = `Generate a motivational story based on a real historical event in the following JSON format:\n\n{
\"title\": \"<story_title>\",
\"date\": \"<yyyy-mm-dd>\", 
\"main_character\": \"<main_character>\", 
\"historical_event\": \"<brief_event_name>\", 
\"location\": \"<location_of_event>\",
\"summary\": \"<short_summary_of_the_story>\",
\"full_story\": \"<detailed_full_story>\",
\"motivational_message\": \"<concluding_motivational_message>\",
\"metadata\": {
  \"themes\": [\"<list_of_key_themes>\"], 
  \"keywords\": [\"<list_of_keywords_related_to_the_story>\"], 
  \"verified\": <true_or_false>
},
\"ui_metadata\": {
  \"background_color\": \"<hex_color_code_for_background>\", 
  \"font\": \"<font_type>\", 
  \"text_color\": \"<hex_color_code_for_text>\", 
  \"highlight_color\": \"<highlight_color_code>\", 
  \"image\": \"<url_of_image_related_to_story>\"
}
}
//IMPORTANT
\n\nEnsure not return duplicated keys
\n\nEnsure tp trim any additional characters. Just return the string with a valid json format
\n\nEnsure the JSON output is valid and can be parsed using JSON.parse(). Do not include any additional information outside the JSON structure.`;
;

  return prompt;
}
