import Stories from "@/components/story-list";
import { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <Suspense
        fallback={
          <>
            <h1>Loading</h1>
          </>
        }
      >
        <Stories />
      </Suspense>
    </div>
  );
};

export default page;
