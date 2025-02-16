import StoryDisplay from "@/components/story-display";
import { storyData } from "@/data/story-data";
import React from "react";

const page = () => {
  return (
    <div>
      <StoryDisplay storyData={storyData} />
    </div>
  );
};

export default page;
