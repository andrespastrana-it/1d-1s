import React from "react";
import Stories from "@/components/story-list";
import { Story } from "@/lib/openai";
import { StoryList } from "@/lib/types";
const page = async () => {
  const resp = await fetch("http://localhost:3000/api/stories/");
  const { data } = await resp.json();

  return (
    <div>
      <Stories stories={data} />
    </div>
  );
};

export default page;
