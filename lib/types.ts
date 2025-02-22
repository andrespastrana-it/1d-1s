
export  interface PaginationParams {
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
  keywords: string[];
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

  export interface StoryEntity extends StoryBase {
    id: string,
  };

 export  interface StoryMetadataForPrompt {
    title: string;
    keywords: string[];
    main_character: string;
  }
  

 export  type StoryList = StoryEntity[];
  