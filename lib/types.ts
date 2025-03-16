import mongoose, { Schema } from "mongoose";

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export type StoryMetadata = {
  themes: string[];
  keywords: string[];
  verified: boolean;
};

export type StoryUIMetadata = {
  background_color: string;
  font: string;
  text_color: string;
  highlight_color: string;
  image: string;
};

export interface StoryBase {
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
  likes: string[];
}

export interface StoryEntity extends StoryBase {
  id: string;
}

export interface StoryMetadataForPrompt {
  title: string;
  keywords: string[];
  main_character: string;
}

export type StoryList = StoryEntity[];

// Likes types
export interface StoryLikes {
  story_id: string | mongoose.Types.ObjectId; // Can be either string ID or ObjectId reference
  user_ids: string[]; // Holds the user IDs of users who liked the story
}

export type StoryLikesEntity = StoryLikes & {
  id: string;
};

// Story Comments types
export interface CommentType {
  storyId: string | Schema.Types.ObjectId;
  commenter: string;
  content: string;
  createdAt: Date;
}

export interface FormComments {
  msg?: string;
  success?: boolean;
  errors: {
    comment?: string[];
  };
  inputs: {
    comment?: string;
  };
}

export interface CommentEntity extends CommentType {
  id: string;
}

// Story Likes Status

export type StoryLikeStatus = {
  isLiked: boolean;
  likeCount: number;
  authenticated?: boolean;
  error?: string;
};
