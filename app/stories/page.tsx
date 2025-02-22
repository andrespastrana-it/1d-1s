import React from "react";
import Stories from "@/components/story-list";

const page = async () => {
  const NEXT_HOST = process.env.NEXT_HOST;

  const resp = await fetch(`${NEXT_HOST}api/stories/`);
  const { data } = await resp.json();

  return (
    <div>
      <Stories stories={data} />
    </div>
  );
};

export default page;
