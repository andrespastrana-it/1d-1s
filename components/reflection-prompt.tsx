"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function ReflectionPrompt({
  historical_event,
  themes,
}: {
  historical_event: string;
  themes: string[];
}) {
  const [reflection, setReflection] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sigin required
    // Here you would typically send the reflection to your backend
    console.log("Reflection submitted:", reflection);
    // Clear the input after submission
    setReflection("");
  };

  return (
    <motion.div
      className="mt-12 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Reflect on Your Journey</h2>
      <p className="mb-4">
        You've just learned about the {historical_event}. How does this story
        relate to your life or the world today? Consider themes like{" "}
        {themes.join(", ")}.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
          rows={4}
          placeholder="Share your thoughts..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit Reflection
        </button>
      </form>
    </motion.div>
  );
}
