"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";
import StoryProgress from "./story-progress";
import ReflectionPrompt from "@/components/reflection-prompt";
import type { Story } from "@/lib/types";

export default function StoryDetail({ story }: { story: Story }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [, setShowReflection] = useState(false);

  const {
    ui_metadata,
    title,
    date,
    main_character,
    historical_event,
    location,
    full_story,
    motivational_message,
    metadata,
  } = story;

  const pageStyle = {
    backgroundColor: ui_metadata.background_color,
    color: ui_metadata.text_color,
    fontFamily: ui_metadata.font,
  };

  const highlightStyle = {
    backgroundColor: ui_metadata.highlight_color,
    color: ui_metadata.background_color,
  };

  const storyParagraphs = full_story.split("\n\n");

  useEffect(() => {
    if (currentSection === storyParagraphs.length) {
      setShowReflection(true);
    }
  }, [currentSection, storyParagraphs.length]);

  return (
    <div className="min-h-screen py-8" style={pageStyle}>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* <Image
            src={ui_metadata.image || "/placeholder.svg"}
            alt={title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          /> */}
        </motion.div>
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-lg">
            <strong>{date}</strong> | {location}
          </p>
          <p className="text-xl mt-2">
            Featuring: <strong>{main_character}</strong>
          </p>
        </motion.div>

        <StoryProgress
          total={storyParagraphs.length}
          current={currentSection}
        />

        <AnimatePresence>
          {storyParagraphs.map(
            (paragraph, index) =>
              index <= currentSection && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-lg leading-relaxed">{paragraph}</p>
                  {index === currentSection &&
                    index !== storyParagraphs.length - 1 && (
                      <button
                        onClick={() => setCurrentSection(index + 1)}
                        className="mt-4 text-center w-full"
                      >
                        <ChevronDown className="mx-auto" size={32} />
                      </button>
                    )}
                </motion.div>
              )
          )}
        </AnimatePresence>

        {true && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mt-8 p-6 rounded-lg text-center"
              style={highlightStyle}
            >
              <Quote className="mx-auto mb-4" size={32} />
              <p className="text-xl italic mb-4">{motivational_message}</p>
              <p className="font-bold">- Inspired by {main_character}</p>
            </div>

            <ReflectionPrompt
              historical_event={historical_event}
              themes={metadata.themes}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
