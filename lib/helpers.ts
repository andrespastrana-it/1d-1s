import {  StoryMetadataForPrompt } from "./types";

export function getStoryGenerationPrompt(existingMetadata: StoryMetadataForPrompt[]) {
  // Prepare existing metadata for use in the prompt
  const existingTitles = existingMetadata.map(story => story.title).join(', ');
  const existingKeywords = existingMetadata.map(story => story.keywords.join(', ')).join(', ');
  const existingCharacters = existingMetadata.map(story => story.main_character).join(', ');

  const prompt = `Generate a motivational story based on a lesser-known or obscure real historical event. Focus on uncovering hidden gems from history that most people aren't familiar with. Do not use any of the following attributes that already exist in the database:\n\n
  Existing Titles: ${existingTitles}\n
  Existing Keywords: ${existingKeywords}\n
  Existing Main Characters: ${existingCharacters}\n
  Ensure the story you generate is unique and does not overlap with these existing elements.

  IMPORTANT GUIDELINES:
  - Choose historical figures who aren't commonly featured in popular culture or standard history textbooks
  - Focus on events from different cultures, time periods, and geographical regions
  - The story should be historically accurate but with an inspiring angle
  - Include interesting historical context that provides educational value

  Please return the story in the following JSON format:
  {
    "title": "<story_title>",
    "date": "<yyyy-mm-dd>",
    "main_character": "<main_character>",
    "historical_event": "<brief_event_name>",
    "location": "<location_of_event>",
    "summary": "<short_summary_of_the_story>",
    "full_story": "<detailed_full_story>",
    "motivational_message": "<concluding_motivational_message>",
    "metadata": {
      "themes": ["<list_of_key_themes>"],
      "keywords": ["<list_of_keywords_related_to_the_story>"],
      "verified": <true_or_false>,
    },
    "ui_metadata": {
      "background_color": "<hex_color_code_for_background>",
      "font": "<font_type>",
      "text_color": "<hex_color_code_for_text>",
      "highlight_color": "<highlight_color_code>",
      "image": "<url_of_image_related_to_story>"
    }
  }
  
  IMPORTANT:
  - Ensure not to return duplicated keys.
  - Ensure to trim any additional characters. Just return the string with a valid JSON format.
  - Ensure the JSON output is valid and can be parsed using JSON.parse().
  - Do not include any additional information outside the JSON structure.`;
  
  return prompt;
}
