"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SchoolTabContainer from "@/components/system components/parent/learninghub components/SchoolTabContainer";
import LearningWorldsContainer from "@/components/system components/parent/learninghub components/LearningWorldsContainer";
import EnrollKidModal from "./EnrollKidModal";
const INTRO_DURATION_MS = 2400;

const LearningHubClientComponent = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), INTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* ✅ Slightly darker backdrop so glow is visible */}
            <div className="absolute inset-0 bg-black/10 " />

            {/* Center group */}
            <div className="relative flex items-center justify-center">
              {/* Outer rotating glow ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 320,
                  height: 320,
                  // brighter + colored conic ring
                  background:
                    "conic-gradient(from 0deg, rgba(0,0,0,0) 0%, rgba(255,200,80,0.95) 18%, rgba(120,180,255,0.95) 38%, rgba(255,120,200,0.95) 58%, rgba(0,0,0,0) 78%)",
                  filter: "blur(10px)",
                  opacity: 0.95,
                  // glow visibility
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "linear",
                }}
              />

              {/* Thin sharp ring (adds definition) */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 260,
                  height: 260,
                  background:
                    "conic-gradient(from 180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0) 55%)",
                  opacity: 0.7,
                  boxShadow: "0 0 20px rgba(255,255,255,0.25)",
                }}
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "linear",
                }}
              />

              {/* Inner pulse light */}
              <motion.div
                className="rounded-full"
                style={{
                  width: 170,
                  height: 170,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 75%)",
                  boxShadow:
                    "0 0 30px rgba(255,255,255,0.35), 0 0 60px rgba(120,180,255,0.25)",
                }}
                animate={{ scale: [1, 1.07, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
              />

              {/* Text */}
              <motion.div
                className="absolute -bottom-20 text-sm font-medium text-white/90"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Opening Learning Hub...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="w-full p-4 flex flex-col gap-4"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 6 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 md:gap-1">
            <h1 className="text-xl md:text-2xl font-bold">
              WELCOME TO LEARNING HUB
            </h1>
            <h2 className="text-sm md:text-base text-black/60">
              Engage your kids to a world full of fun to learn and earn points
            </h2>
          </div>

          <div>
            <EnrollKidModal />
          </div>
        </div>

        <SchoolTabContainer />

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Available Learning Worlds</h2>
          <LearningWorldsContainer />
        </div>
      </motion.div>
    </div>
  );
};

export default LearningHubClientComponent;
