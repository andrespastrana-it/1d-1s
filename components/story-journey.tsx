"use client";

import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, Users, Tag, ChevronDown } from "lucide-react";
import { useState } from "react";

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

export default function StoryJourney({ storyData }: { storyData: StoryData }) {
  const { story, metadata, uiMetadata } = storyData;
  const [currentSection, setCurrentSection] = useState(0);

  const containerStyle = {
    backgroundColor: uiMetadata.backgroundColor,
    color: uiMetadata.fontColor,
    fontFamily: uiMetadata.fontFamily,
    borderRadius: uiMetadata.borderRadius,
    boxShadow: uiMetadata.boxShadow,
  };

  const headingStyle = {
    fontSize: uiMetadata.additionalStyles.headingFontSize,
    fontStyle: uiMetadata.fontStyle,
  };

  const contentStyle = {
    fontSize: uiMetadata.additionalStyles.contentFontSize,
  };

  const buttonStyle = {
    backgroundColor: uiMetadata.additionalStyles.buttonColor,
    color: uiMetadata.additionalStyles.buttonTextColor,
  };

  const storyParagraphs = story.content.split("\n\n");

  const journeySections = [
    { title: "The Setting", icon: MapPin },
    { title: "The Challenge", icon: Plane },
    { title: "The Response", icon: Users },
    { title: "The Outcome", icon: Tag },
    { title: "The Lesson", icon: ChevronDown },
  ];

  return (
    <div
      className="flex-grow flex flex-col items-center justify-center py-12 px-4"
      style={containerStyle}
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        style={headingStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {story.title}
      </motion.h1>

      <motion.div
        className="flex items-center justify-center space-x-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Calendar className="w-5 h-5" />
        <span>{metadata.eventDate}</span>
        <MapPin className="w-5 h-5 ml-4" />
        <span>{metadata.location}</span>
      </motion.div>

      <div className="max-w-3xl w-full">
        {journeySections.map((section, index) => (
          <motion.div
            key={index}
            className={`mb-8 p-6 bg-white rounded-lg shadow-md ${
              index === currentSection ? "border-2 border-blue-500" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <section.icon
                className="w-6 h-6 mr-2"
                style={{ color: uiMetadata.highlightColor }}
              />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <p style={contentStyle}>{storyParagraphs[index]}</p>
            {index < journeySections.length - 1 && (
              <button
                className="mt-4 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                style={buttonStyle}
                onClick={() => setCurrentSection(index + 1)}
              >
                Continue the journey
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Key Themes</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {metadata.keyThemes.map((theme, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {theme}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.blockquote
        className="text-xl mt-8 mb-8 text-center max-w-2xl"
        style={{ fontStyle: uiMetadata.additionalStyles.quoteFontStyle }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        "{story.callToAction}"
      </motion.blockquote>

      <motion.button
        className="px-6 py-3 rounded-full transition-colors duration-300 flex items-center justify-center"
        style={buttonStyle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Plane className="mr-2" />
        Explore More Stories
      </motion.button>
    </div>
  );
}
