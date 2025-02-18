"use client";

import { motion } from "framer-motion";

export default function StoryProgress({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-center mt-2 text-sm">
        {current} of {total} sections read
      </p>
    </div>
  );
}
