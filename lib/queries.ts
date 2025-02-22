import { Story } from '@/lib/models';

// LOT OF DB QUERIES TO FIND A DUPLICATED STORY



export const checkTitleDateCharacter = async (story: any): Promise<boolean> => {
  const { title, date, main_character } = story;
  
  // Check for Title + Date + Main Character match
  const storyByTitleDateCharacter = await Story.findOne({
    title: title.toLowerCase(),
    date: date,
    main_character: main_character.toLowerCase(),
  });

  return !!storyByTitleDateCharacter; // Return true if a story with matching criteria is found
};

export const checkEventLocation = async (story: any): Promise<boolean> => {
  const { historical_event, location } = story;
  
  // Check for Historical Event + Location match
  const storyByEventLocation = await Story.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
  });

  return !!storyByEventLocation; // Return true if a story with matching criteria is found
};

export const checkTitleKeywords = async (story: any): Promise<boolean> => {
  const { title, metadata: { keywords } } = story;
  
  // Check for Title + Keywords match
  const storyByKeywords = await Story.findOne({
    title: title.toLowerCase(),
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });

  return !!storyByKeywords; // Return true if a story with matching criteria is found
};

export const checkTitleMotivationalMessage = async (story: any): Promise<boolean> => {
  const { title, motivational_message } = story;
    
  // Check for Title + Motivational Message match
  const storyByTitleMessage = await Story.findOne({
    title: title.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByTitleMessage; // Return true if a story with matching criteria is found
};

export const checkLocationSummary = async (story: any): Promise<boolean> => {
  const { location, summary } = story;
    
  // Check for Location + Summary match
  const storyByLocationSummary = await Story.findOne({
    location: location.toLowerCase(),
    summary: summary.toLowerCase(),
  });
  
  return !!storyByLocationSummary; // Return true if a story with matching criteria is found
};

export const checkKeywordsMainCharacter = async (story: any): Promise<boolean> => {
  const { metadata: { keywords }, main_character } = story;
    
  // Check for Keywords + Main Character match
  const storyByKeywordsCharacter = await Story.findOne({
    main_character: main_character.toLowerCase(),
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });
  
  return !!storyByKeywordsCharacter; // Return true if a story with matching criteria is found
};

export const checkTitleFullStory = async (story: any): Promise<boolean> => {
  const { title, full_story } = story;
    
  // Check for Title + Full Story match
  const storyByTitleFullStory = await Story.findOne({
    title: title.toLowerCase(),
    full_story: full_story.toLowerCase(),
  });
  
  return !!storyByTitleFullStory; // Return true if a story with matching criteria is found
};

export const checkEventMotivationalMessage = async (story: any): Promise<boolean> => {
  const { historical_event, motivational_message } = story;
    
  // Check for Historical Event + Motivational Message match
  const storyByEventMessage = await Story.findOne({
    historical_event: historical_event.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByEventMessage; // Return true if a story with matching criteria is found
};

export const checkEventLocationSummary = async (story: any): Promise<boolean> => {
  const { historical_event, location, summary } = story;
    
  // Check for Historical Event + Location + Summary match
  const storyByEventLocationSummary = await Story.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
    summary: summary.toLowerCase(),
  });
  
  return !!storyByEventLocationSummary; // Return true if a story with matching criteria is found
};

export const checkDateKeywords = async (story: any): Promise<boolean> => {
  const { date, metadata: { keywords } } = story;
    
  // Check for Date + Keywords match
  const storyByDateKeywords = await Story.findOne({
    date: date,
    'metadata.keywords': { $in: keywords.map((k: string) => k.toLowerCase()) },
  });
  
  return !!storyByDateKeywords; // Return true if a story with matching criteria is found
};

export const checkEventLocationMessage = async (story: any): Promise<boolean> => {
  const { historical_event, location, motivational_message } = story;
    
  // Check for Historical Event + Location + Motivational Message match
  const storyByEventLocationMessage = await Story.findOne({
    historical_event: historical_event.toLowerCase(),
    location: location.toLowerCase(),
    motivational_message: motivational_message.toLowerCase(),
  });
  
  return !!storyByEventLocationMessage; // Return true if a story with matching criteria is found
};

// Export all functions in an object
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
