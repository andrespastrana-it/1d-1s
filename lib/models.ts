import mongoose, { Schema, Document, model, Model } from "mongoose";
import type { CommentType, StoryBase } from "./types";

// Types
export interface StoryDocument extends StoryBase, Document {}
export interface CommentDocument extends CommentType, Document {}

//Schemas
const StorySchema = new Schema<StoryDocument>(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
      index: true, // Added index for quick title search
    },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"],
      index: true, // Added index for date-based searches
    },
    main_character: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: [1, "Main character name must be at least 1 character"],
      maxlength: [50, "Main character name must be at most 50 characters"],
      index: true, // Added index for character search
    },
    historical_event: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: [
        1,
        "Historical event description must be at least 1 character",
      ],
      maxlength: [
        100,
        "Historical event description must be at most 100 characters",
      ],
      index: true, // Added index for event search
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      index: true, // Already indexed for fast location-based searches
      minlength: [1, "Location must be at least 1 character"],
      maxlength: [100, "Location must be at most 100 characters"],
    },
    summary: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [10, "Summary must be at least 10 characters"],
      maxlength: [500, "Summary must be at most 500 characters"],
    },
    full_story: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [50, "Full story must be at least 50 characters"],
      maxlength: [5000, "Full story must be at most 2000 characters"],
    },
    motivational_message: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [10, "Motivational message must be at least 10 characters"],
      maxlength: [300, "Motivational message must be at most 300 characters"],
      index: true, // Added index for motivational message search
    },
    metadata: {
      themes: {
        type: [String],
        required: true,
        validate: [
          (val: string[]) => val.length >= 1,
          "Themes must have at least 1 item",
        ],
      },
      keywords: {
        type: [String],
        required: true,
        lowercase: true,
        index: true, // Already indexed for fast keyword searches
        trim: true,
        validate: [
          (val: string[]) => val.length >= 1 && val.length <= 50,
          "Keywords must have between 1 and 50 items",
        ],
      },
      verified: {
        type: Boolean,
        required: true,
      },
    },
    ui_metadata: {
      background_color: {
        type: String,
        required: true,
        match: [/^#[0-9a-fA-F]{6}$/, "Invalid hex color code"],
      },
      font: {
        type: String,
        required: true,
        minlength: [3, "Font must be at least 3 characters"],
        maxlength: [50, "Font must be at most 50 characters"],
      },
      text_color: {
        type: String,
        required: true,
        match: [/^#[0-9a-fA-F]{6}$/, "Invalid hex color code"],
      },
      highlight_color: {
        type: String,
        required: true,
        match: [/^#[0-9a-fA-F]{6}$/, "Invalid hex color code"],
      },
      image: {
        type: String,
        required: true,
        match: [
          /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/,
          "Invalid image URL format",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

const CommentSchema = new Schema<CommentDocument>(
  {
    storyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
      index: true,
    },
    commenter: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Commenter name must be at least 1 character"],
      maxlength: [50, "Commenter name must be at most 50 characters"],
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Comment content must be at least 1 character"],
      maxlength: [1000, "Comment content must be at most 1000 characters"],
    },

    createdAt: {
      type: Date,
      default: new Date(),
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Methods to convert `_id` to `id` in the returned JSON
StorySchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString(); // Convert `_id` to `id`
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove Mongoose version key
    return ret;
  },
});

CommentSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString(); // Convert `_id` to `id`
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove Mongoose version key
    return ret;
  },
});

// Create and export the Mongoose model
export const Story =
  (mongoose.models.Story as Model<StoryDocument>) ||
  model<StoryDocument>("Story", StorySchema);

export const Comment =
  (mongoose.models.Comment as Model<CommentDocument>) ||
  model<CommentDocument>("Comment", CommentSchema);
