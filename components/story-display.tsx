"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface StoryData {
  story: {
    title: string;
    content: string;
    callToAction: string;
  };
  metadata: {
    event: string;
    eventDate: string;
    peopleInvolved: string[];
    keyThemes: string[];
    storyType: string;
    location: string;
  };
  uiMetadata: {
    backgroundColor: string;
    fontColor: string;
    fontStyle: string;
    fontFamily: string;
    highlightColor: string;
    layoutType: string;
    icon: string;
    textAlign: string;
    borderRadius: string;
    padding: string;
    boxShadow: string;
    additionalStyles: {
      headingFontSize: string;
      contentFontSize: string;
      quoteFontStyle: string;
      buttonColor: string;
      buttonTextColor: string;
    };
  };
}

export default function StoryDisplay({ storyData }: { storyData: StoryData }) {
  const { story, metadata, uiMetadata } = storyData;

  const containerStyle = {
    backgroundColor: uiMetadata.backgroundColor,
    color: uiMetadata.fontColor,
    fontFamily: uiMetadata.fontFamily,
    textAlign: uiMetadata.textAlign as "center" | "left" | "right",
    borderRadius: uiMetadata.borderRadius,
    padding: uiMetadata.padding,
    boxShadow: uiMetadata.boxShadow,
  };

  const headingStyle = {
    fontSize: uiMetadata.additionalStyles.headingFontSize,
    fontStyle: uiMetadata.fontStyle,
  };

  const contentStyle = {
    fontSize: uiMetadata.additionalStyles.contentFontSize,
  };

  const highlightStyle = {
    backgroundColor: uiMetadata.highlightColor,
    color: uiMetadata.backgroundColor,
  };

  const buttonStyle = {
    backgroundColor: uiMetadata.additionalStyles.buttonColor,
    color: uiMetadata.additionalStyles.buttonTextColor,
  };

  return (
    <motion.section
      className="flex-grow flex flex-col items-center justify-center p-8"
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="mb-6"
          style={headingStyle}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          {story.title}
        </motion.h1>
        <motion.div
          className="mb-8 p-4 rounded-lg"
          style={highlightStyle}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-semibold mb-2">
            {metadata.event} - {metadata.eventDate}
          </p>
          <p className="mb-2">Location: {metadata.location}</p>
          <p className="mb-2">
            Key People: {metadata.peopleInvolved.join(", ")}
          </p>
          <p>Themes: {metadata.keyThemes.join(", ")}</p>
        </motion.div>
        <motion.div
          className="mb-8"
          style={contentStyle}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
        >
          {story.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>
        <motion.blockquote
          className="text-xl mb-8"
          style={{ fontStyle: uiMetadata.additionalStyles.quoteFontStyle }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          "{story.callToAction}"
        </motion.blockquote>
        <motion.button
          className="px-6 py-3 rounded-full transition-colors duration-300 flex items-center justify-center"
          style={buttonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plane className="mr-2" />
          View Previous Stories
        </motion.button>
      </div>
    </motion.section>
  );
}
