"use client"

import { motion } from "framer-motion"
import { Book, Calendar, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 text-white">
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-8 text-center text-yellow-300 font-bungee"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        One Day, One History
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl mb-12 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Embark on a daily journey through time, exploring captivating stories of human triumph and resilience.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <FeatureCard
          icon={<Calendar className="w-12 h-12 mb-4 text-yellow-300" />}
          title="Daily Stories"
          description="A new historical tale every day to inspire and educate."
        />
        <FeatureCard
          icon={<Globe className="w-12 h-12 mb-4 text-yellow-300" />}
          title="Global Perspectives"
          description="Diverse stories from cultures around the world."
        />
        <FeatureCard
          icon={<Book className="w-12 h-12 mb-4 text-yellow-300" />}
          title="Interactive Journey"
          description="Immerse yourself in history through our unique storytelling format."
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        <Link
          href="/story"
          className="bg-yellow-300 text-purple-900 px-8 py-4 rounded-full text-xl font-bold flex items-center hover:bg-yellow-400 transition-colors duration-300"
        >
          Start Your Journey <ArrowRight className="ml-2" />
        </Link>
      </motion.div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
      {icon}
      <h2 className="text-xl font-bold mb-2 font-bungee">{title}</h2>
      <p>{description}</p>
    </div>
  )
}

