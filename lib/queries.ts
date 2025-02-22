import { Story as StoryModel } from "@/lib/models"; // For runtime use
import type { Story as StoryType } from "@/lib/validations"; // For type use

export const checkTitleDateCharacter = async (story: StoryType): Promise<boolean> => {
  const { title, date, main_character } = story;
  
  const storyByTitleDateCharacter = await StoryModel.findOne({
    title: title.toLowerCase(),
    date: date,
    main_character: main_character.toLowerCase(),
  });

  return !!storyByTitleDateCharacter;
};

export const checkEventLocation = async (story: StoryType): Promise<boolean> => {
  const { historical_event, location } = story;
  
  const storyByEventLocation = await StoryModel.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
  });

  return !!storyByEventLocation;
};

export const checkTitleKeywords = async (story: StoryType): Promise<boolean> => {
  const { title, metadata: { keywords } } = story;
  
  const storyByKeywords = await StoryModel.findOne({
    title: title.toLowerCase(),
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });

  return !!storyByKeywords;
};

export const checkTitleMotivationalMessage = async (story: StoryType): Promise<boolean> => {
  const { title, motivational_message } = story;
    
  const storyByTitleMessage = await StoryModel.findOne({
    title: title.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByTitleMessage;
};

export const checkLocationSummary = async (story: StoryType): Promise<boolean> => {
  const { location, summary } = story;
    
  const storyByLocationSummary = await StoryModel.findOne({
    location: location.toLowerCase(),
    summary: summary.toLowerCase(),
  });
  
  return !!storyByLocationSummary;
};

export const checkKeywordsMainCharacter = async (story: StoryType): Promise<boolean> => {
  const { metadata: { keywords }, main_character } = story;
    
  const storyByKeywordsCharacter = await StoryModel.findOne({
    main_character: main_character.toLowerCase(),
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });
  
  return !!storyByKeywordsCharacter;
};

export const checkTitleFullStory = async (story: StoryType): Promise<boolean> => {
  const { title, full_story } = story;
    
  const storyByTitleFullStory = await StoryModel.findOne({
    title: title.toLowerCase(),
    full_story: full_story.toLowerCase(),
  });
  
  return !!storyByTitleFullStory;
};

export const checkEventMotivationalMessage = async (story: StoryType): Promise<boolean> => {
  const { historical_event, motivational_message } = story;
    
  const storyByEventMessage = await StoryModel.findOne({
    historical_event: historical_event.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByEventMessage;
};

export const checkEventLocationSummary = async (story: StoryType): Promise<boolean> => {
  const { historical_event, location, summary } = story;
    
  const storyByEventLocationSummary = await StoryModel.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
    summary: summary.toLowerCase(),
  });
  
  return !!storyByEventLocationSummary;
};

export const checkDateKeywords = async (story: StoryType): Promise<boolean> => {
  const { date, metadata: { keywords } } = story;
    
  const storyByDateKeywords = await StoryModel.findOne({
    date: date,
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });
  
  return !!storyByDateKeywords;
};

export const checkEventLocationMessage = async (story: StoryType): Promise<boolean> => {
  const { historical_event, location, motivational_message } = story;
    
  const storyByEventLocationMessage = await StoryModel.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByEventLocationMessage;
};

export const storyCriteriaChecks = {
  checkTitleDateCharacter,
  checkEventLocation,
  checkTitleKeywords,
  checkTitleMotivationalMessage,
  checkLocationSummary,
  checkKeywordsMainCharacter,
  checkTitleFullStory,
  checkEventMotivationalMessage,
  checkEventLocationSummary,
  checkDateKeywords,
  checkEventLocationMessage,
};
