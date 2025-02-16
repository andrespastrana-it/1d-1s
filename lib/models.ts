import  { Schema, Document, model } from 'mongoose';

// Define the TypeScript interface for the Story document
export interface IStory extends Document {
  story_id: string;
  title: string;
  date: string;
  main_character: string;
  historical_event: string;
  location: string;
  summary: string;
  full_story: string;
  motivational_message: string;
  metadata: {
    themes: string[];
    keywords: string[];
    verified: boolean;
  };
  ui_metadata: {
    background_color: string;
    font: string;
    text_color: string;
    highlight_color: string;
    image: string;
  };
}

// Define the Mongoose schema
 const StorySchema = new Schema<IStory>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    main_character: { type: String, required: true },
    historical_event: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
    full_story: { type: String, required: true },
    motivational_message: { type: String, required: true },
    metadata: {
      themes: { type: [String], required: true },
      keywords: { type: [String], required: true },
      verified: { type: Boolean, required: true },
    },
    ui_metadata: {
      background_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
      font: { type: String, required: true },
      text_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
      highlight_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
      image: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// Create and export the Mongoose model
export const Story = model<IStory>('Story', StorySchema);


