"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, UserPlus, GraduationCap, ClipboardCheck, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import KidFriendlyTV from "./KidTV";

const Testimonials: React.FC = () => {
  const [hoveredBalloon, setHoveredBalloon] = useState<number | null>(null);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });
  const [rainbowVisible, setRainbowVisible] = useState(false);

  // Move star around randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setStarPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent pt-20 rounded-3xl relative overflow-hidden">
      {/* Floating Clouds SVG */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full opacity-20"
          aria-hidden="true"
        >
          <motion.path
            d="M100,200 Q150,100 200,200 Q250,300 300,200 Q350,100 400,200 C450,300 500,100 550,200 Q600,300 650,200 Q700,100 750,200 Q800,300 850,200 Q900,100 950,200"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.ellipse
            cx="200"
            cy="150"
            rx="40"
            ry="30"
            fill="#E0F2FE"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <motion.ellipse
            cx="700"
            cy="120"
            rx="50"
            ry="30"
            fill="#E0F2FE"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Interactive Star that follows cursor */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        initial={{ scale: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          x: `${starPosition.x}%`,
          y: `${starPosition.y}%`,
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          scale: { repeat: Infinity, duration: 2 },
          rotate: { repeat: Infinity, duration: 3 },
        }}
      >
        <svg width="40" height="40" viewBox="0 0 50 50">
          <motion.path
            d="M25,2 L30,20 L48,20 L35,30 L40,48 L25,38 L10,48 L15,30 L2,20 L20,20 Z"
            fill="#FFD700"
            stroke="#FFA500"
            strokeWidth="1"
            initial={{ fill: "#FFD700" }}
            animate={{ fill: ["#FFD700", "#FFA500", "#FFD700"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Interactive Balloons */}
      <div className="absolute right-10 top-20 z-10">
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            width="60"
            height="100"
            viewBox="0 0 60 100"
            className="absolute"
            style={{ right: `${i * 40}px`, top: `${i * 20}px` }}
            onMouseEnter={() => setHoveredBalloon(i)}
            onMouseLeave={() => setHoveredBalloon(null)}
          >
            <motion.path
              d="M30,20 Q10,20 10,40 Q10,70 30,80 Q50,70 50,40 Q50,20 30,20 Z"
              fill={i === 0 ? "#FF6B6B" : i === 1 ? "#48BB78" : "#4299E1"}
              initial={{ y: 0 }}
              animate={{
                y: hoveredBalloon === i ? -10 : [0, -5, 0],
                scale: hoveredBalloon === i ? 1.1 : 1,
              }}
              transition={{
                y:
                  hoveredBalloon === i
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: 2 + i },
                scale: { duration: 0.3 },
              }}
            />
            <motion.path
              d="M30,80 L35,100"
              stroke="#888"
              strokeWidth="2"
              fill="none"
              initial={{ y: 0 }}
              animate={{
                y: hoveredBalloon === i ? -10 : [0, -5, 0],
              }}
              transition={{
                y:
                  hoveredBalloon === i
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: 2 + i },
              }}
            />
          </motion.svg>
        ))}
      </div>

      {/* Rainbow that appears on hover */}
      <div
        className="absolute left-0 bottom-0 w-full h-40 pointer-events-none z-0"
        onMouseEnter={() => setRainbowVisible(true)}
        onMouseLeave={() => setRainbowVisible(false)}
      >
        <motion.svg
          viewBox="0 0 1000 200"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: rainbowVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.path
            d="M0,200 Q500,50 1000,200"
            fill="none"
            stroke="red"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M0,200 Q500,70 1000,200"
            fill="none"
            stroke="orange"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          />
          <motion.path
            d="M0,200 Q500,90 1000,200"
            fill="none"
            stroke="yellow"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.path
            d="M0,200 Q500,110 1000,200"
            fill="none"
            stroke="green"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path
            d="M0,200 Q500,130 1000,200"
            fill="none"
            stroke="blue"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d="M0,200 Q500,150 1000,200"
            fill="none"
            stroke="purple"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rainbowVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Right side with text and features */}
          <div className="w-full lg:w-1/2 relative">
            {/* Animated Pencil SVG */}
            <motion.div
              className="absolute -left-16 top-0"
              initial={{ rotate: -30, x: -50 }}
              animate={{ rotate: [-30, -25, -30], x: [-50, -40, -50] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="80" height="100" viewBox="0 0 80 100">
                <rect x="30" y="5" width="20" height="60" fill="#FFD700" />
                <rect x="30" y="65" width="20" height="15" fill="#F87171" />
                <polygon points="30,80 50,80 40,95" fill="#000000" />
                <rect x="30" y="5" width="20" height="5" fill="#D1D5DB" />
              </svg>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 drop-shadow-[2px_2px_2px_rgba(79,70,229,0.3)]">
              Join Our Fun Learning Adventure!
            </h2>

            <motion.p
              className="text-gray-600 mb-8 text-lg rounded-lg bg-white p-4 border-2 border-dashed border-pink-300 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Book SVG */}
              <motion.span
                className="absolute -right-10 -top-10 z-10"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <svg width="60" height="50" viewBox="0 0 60 50">
                  <rect
                    x="5"
                    y="5"
                    width="50"
                    height="40"
                    rx="3"
                    fill="#3B82F6"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="40"
                    height="30"
                    rx="2"
                    fill="#EFF6FF"
                  />
                  <line
                    x1="15"
                    y1="15"
                    x2="45"
                    y2="15"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="20"
                    x2="45"
                    y2="20"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="25"
                    x2="45"
                    y2="25"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="30"
                    x2="35"
                    y2="30"
                    stroke="#6B7280"
                    strokeWidth="2"
                  />
                </svg>
              </motion.span>

              {[
                "Our students and their parents love learning with us! Discover how iLearner's Hub makes education fun, engaging, and effective for every child. See what real families are saying about their adventures and achievements with our courses.",
              ].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.8,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Feature 1 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(74,222,128,0.5)] relative overflow-hidden bg-gradient-to-r from-green-100 to-green-50 border border-green-200 group">
                <div className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <Users className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-green-800 group-hover:translate-x-1 transition-transform">
                    Qualified & Experienced Tutors
                  </span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(244,114,182,0.5)] relative overflow-hidden bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 group">
                <div className="absolute inset-0 bg-pink-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <UserPlus className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-pink-800 group-hover:translate-x-1 transition-transform">
                    Small Group & One-to-One Tuition
                  </span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(251,146,60,0.5)] relative overflow-hidden bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 group">
                <div className="absolute inset-0 bg-orange-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <GraduationCap className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-orange-800 group-hover:translate-x-1 transition-transform">
                    Personalised Learning Approach
                  </span>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(59,130,246,0.5)] relative overflow-hidden bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 group">
                <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <ClipboardCheck className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-blue-800 group-hover:translate-x-1 transition-transform">
                    Regular Assessments & Progress Updates
                  </span>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(168,85,247,0.5)] relative overflow-hidden bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 group">
                <div className="absolute inset-0 bg-purple-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <TrendingUp className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-purple-800 group-hover:translate-x-1 transition-transform">
                    Proven Track Record of Success
                  </span>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col justify-center p-4 rounded-2xl transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_25px_-5px_rgba(20,184,166,0.5)] relative overflow-hidden bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-200 group">
                <div className="absolute inset-0 bg-teal-200 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                    <ShieldCheck className="h-5 w-5 text-white drop-shadow-md" />
                  </div>
                  <span className="font-bold text-[15px] md:text-base leading-tight text-teal-800 group-hover:translate-x-1 transition-transform">
                    Supportive & Friendly Learning Environment
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/courses/all-courses">
                <motion.span
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wide
                  shadow-[0_6px_0_rgb(79,70,229)]
                  hover:shadow-[0_4px_0px_rgb(79,70,229)] hover:translate-y-[2px]
                  active:shadow-none active:translate-y-[6px] active:bg-indigo-800
                  transition-all duration-150 ease-in-out relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Adventure!
                  {/* Button sparks - shows on hover */}
                  <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.circle
                      cx="10"
                      cy="10"
                      r="3"
                      fill="#FCD34D"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, -10, -15],
                        y: [0, -10, -5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 0.2,
                      }}
                    />
                    <motion.circle
                      cx="90"
                      cy="10"
                      r="3"
                      fill="#FCD34D"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, 10, 15],
                        y: [0, -10, -5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                    <motion.circle
                      cx="90"
                      cy="90"
                      r="3"
                      fill="#FCD34D"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, 10, 15],
                        y: [0, 10, 5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                      }}
                    />
                    <motion.circle
                      cx="10"
                      cy="90"
                      r="3"
                      fill="#FCD34D"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, -10, -15],
                        y: [0, 10, 5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1.1,
                      }}
                    />
                  </motion.svg>
                </motion.span>
              </Link>

              <Link href="/courses/all-courses">
                <motion.span
                  className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wide
                  shadow-[0_6px_0_rgb(217,119,6)]
                  hover:shadow-[0_4px_0px_rgb(217,119,6)] hover:translate-y-[2px]
                  active:shadow-none active:translate-y-[6px] active:bg-orange-600
                  transition-all duration-150 ease-in-out relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore our courses...
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Left side with old-style TV */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <KidFriendlyTV />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
