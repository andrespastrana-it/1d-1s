
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
  
  export type Story = {
    _id: string;
    title: string;
    date: string; // ISO format (YYYY-MM-DD)
    main_character: string;
    historical_event: string;
    location: string;
    summary: string;
    full_story: string;
    motivational_message: string;
    metadata: StoryMetadata;
    ui_metadata: StoryUIMetadata;
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
  };

 export  interface StoryMetadataForPrompt {
    title: string;
    keywords: string[];
    main_character: string;
  }
  

 export  type StoryList = Story[];
  