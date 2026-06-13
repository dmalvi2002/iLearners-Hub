"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Separate component for floating SVG elements
const FloatingElements = () => {
  return (
    <div className="absolute container inset-0 mx-auto flex items-center justify-center">
      {/* Improved Rocket animation with smoother motion */}
      <motion.div
        className="absolute inset-0 top-40 left-0 w-14 h-14 md:w-20 md:h-20 z-0 block"
        animate={{
          x: [0, 500, 0], // Simplified path
          y: [0, -80, 0], // Smooth arc
          rotate: [0, 45, 180, 360], // Smooth rotation
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut", // Smooth transitions
          times: [0, 0.5, 1], // Control timing
        }}
      >
        <img src="/images/rocket.gif" alt="Rocket" className="w-full h-full" />
      </motion.div>

      {/* Animated Earth SVG */}
      <motion.div
        className="absolute opacity-20 top-26 right-6 w-12 h-12 md:w-24 md:h-24 z-0 block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <img
          src="/images/planet/planet3.svg"
          alt="Rocket"
          className="w-full h-full"
        />
      </motion.div>

      {/* Animated Chemistry Flask SVG */}
      <motion.div
        className="absolute opacity-20  bottom-20 right-2 w-10 h-10 md:w-20 md:h-20 z-0 block"
        animate={{
          y: [0, -10, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40,20 L40,50 L30,70 Q30,85 50,85 Q70,85 70,70 L60,50 L60,20 Z"
            fill="#DDD6FE"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <rect x="35" y="10" width="30" height="10" fill="#8B5CF6" rx="2" />
          <path
            d="M35,65 Q50,55 65,65"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <circle cx="45" cy="72" r="3" fill="#A78BFA" />
          <circle cx="55" cy="68" r="2" fill="#A78BFA" />
          <circle cx="50" cy="75" r="2.5" fill="#A78BFA" />
        </svg>
      </motion.div>

      {/* Animated Math Symbols SVG */}
      <motion.div
        className="absolute opacity-20  top-60 left-4 w-8 h-8 md:w-16 md:h-16 z-0 block"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/math-elements/5070.svg"
          alt="Math Symbols"
          className="w-full h-full"
        />
      </motion.div>

      {/* Animated Lightbulb SVG */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-16 md:h-16 z-0 block"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          y: [-5, 5, -5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,10 Q25,10 25,40 Q25,60 40,70 L40,85 L60,85 L60,70 Q75,60 75,40 Q75,10 50,10"
            fill="#FDE68A"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <rect x="40" y="85" width="20" height="5" fill="#F59E0B" rx="1" />
          <path
            d="M35,40 L65,40 M35,50 L65,50 M35,60 L65,60"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="2,2"
          />
          <path
            d="M30,30 L70,30"
            stroke="#FBBF24"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Animated Math Symbol SVG */}
      <motion.div
        className="absolute opacity-20  bottom-20 left-[47%] transform -translate-x-1/2 w-8 h-8 md:w-16 md:h-16 z-0 block"
        animate={{
          y: [0, -5, 0],
          rotate: [-3, 5, -6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/math-elements/geometry.svg"
          alt="Math Symbols"
          className="w-full h-full"
        />
      </motion.div>

      {/* DNA Helix SVG Animation */}
      <motion.div
        className="absolute opacity-20 bottom-10 left-4 w-12 h-16 md:w-26 md:h-32 z-0 block"
        animate={{
          rotateY: 360,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <img
          src="/images/math-elements/dna-helix.svg"
          alt="Math Symbols"
          className="w-full h-full"
        />
      </motion.div>

      {/* Atom SVG Animation */}
      <motion.div
        className="absolute bottom-16 right-4 w-12 h-12 md:w-20 md:h-20 z-0 block"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="20"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="20"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="20"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            transform="rotate(120 50 50)"
          />
          <circle cx="50" cy="50" r="8" fill="#0EA5E9" />

          <motion.circle
            cx="95"
            cy="50"
            r="4"
            fill="#7DD3FC"
            animate={{
              cx: [95, 5, 95],
              cy: [50, 50, 50],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle
            cx="72"
            cy="85"
            r="4"
            fill="#7DD3FC"
            animate={{
              cx: [72, 28, 72],
              cy: [85, 15, 85],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle
            cx="28"
            cy="85"
            r="4"
            fill="#7DD3FC"
            animate={{
              cx: [28, 72, 28],
              cy: [85, 15, 85],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

const Hero = () => {

  return (
    <div className="relative min-h-[670px] pt-20 md:pt-30 pb-4 md:pb-20 overflow-hidden bg-transparent">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-orange-100">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="currentColor" />
        </svg>
      </div>

      <div className="container mt-10 mx-auto px-6 py-12 flex flex-col lg:flex-row items-center">
        <FloatingElements />

        {/* Left side with images - kept as is */}
        <div className="relative w-full lg:w-1/2 mb-16 lg:mb-0 flex justify-center scale-105 xl:scale-110">
          <div className="relative z-10">
            {/* Main instructor with responsive sizing */}
            <div className="bg-orange-500 rounded-full p-1 sm:p-2 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center overflow-hidden">
              <Image
                src="/images/middle.png"
                alt="Main instructor"
                width={384}
                height={384}
                className="object-cover rounded-full w-full h-full"
              />
            </div>

            {/* Female student floating on the left side */}
            <div className="absolute -left-12 sm:-left-20 lg:-left-24 bottom-20 sm:bottom-24 bg-pink-400 rounded-full p-1 sm:p-2 w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 z-20 animate-orbit-left">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/left.png"
                  alt="Left view"
                  width={192}
                  height={192}
                  className="rounded-full w-full h-full object-cover p-1"
                />
              </div>
            </div>

            {/* Male student floating on the bottom right */}
            <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 lg:-bottom-14 lg:-right-14 bg-purple-300 rounded-full p-1 sm:p-2 w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 z-20 animate-orbit-right">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/right.png"
                  alt="Male student"
                  width={192}
                  height={192}
                  className="rounded-full w-full h-full object-cover p-1"
                />
              </div>
            </div>
            <div className="absolute inset-0 animate-spin-slow -z-1">
              {/* Blue ring around the main instructor - scaled for responsiveness */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 -m-6 sm:-m-8 md:-m-10 lg:-m-12 -z-1"></div>

              {/* Decorative dots positioned precisely over the blue ring - scaled for responsiveness */}
              {/* Top dots */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 sm:-translate-y-10 lg:-translate-y-14 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full -z-1">
                <img
                  src="/images/planet/planet1.svg"
                  alt="planet1"
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                />
              </div>

              {/* Right dots */}
              <div className="absolute top-1/2 right-0 transform translate-x-8 sm:translate-x-10 lg:translate-x-14 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full -z-1">
                <img
                  src="/images/planet/planet2.svg"
                  alt="planet2"
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                />
              </div>

              {/* Bottom dots */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 sm:translate-y-10 lg:translate-y-14 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full -z-1">
                <img
                  src="/images/planet/planet3.svg"
                  alt="planet3"
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                />
              </div>

              {/* Left dots */}
              <div className="absolute top-1/2 left-0 transform -translate-x-8 sm:-translate-x-10 lg:-translate-x-14 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full -z-1">
                <img
                  src="/images/planet/planet4.svg"
                  alt="planet4"
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side with text and buttons - modified for kid-friendly design */}
        <div className="w-full lg:w-1/2 z-10 lg:pl-12 space-y-6">
          <motion.h1
            className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
              Learn, Play & Grow
            </span>
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
              Everyday
            </span>{" "}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
              with
            </span>
            <span className="relative inline-block ml-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-orange-600 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.3)]">
                Awesome Teachers!
              </span>
            </span>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-radial from-blue-300 to-blue-200 rounded-full opacity-60 blur-xl -z-10"></div>
            <div className="absolute top-12 -left-6 w-16 h-16 bg-gradient-radial from-orange-300 to-orange-200 rounded-full opacity-60 blur-xl -z-10"></div>
          </motion.h1>

          {/* Creative Subjects Cluster */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl z-10 py-4"
          >
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {[
                { label: "🧮 Maths", color: "bg-blue-100 text-blue-700 border-blue-300" },
                { label: "✏️ English", color: "bg-pink-100 text-pink-700 border-pink-300" },
                { label: "🔬 Science", color: "bg-green-100 text-green-700 border-green-300" },
                { label: "💻 Computing", color: "bg-indigo-100 text-indigo-700 border-indigo-300" },
                { label: "⚛️ Physics", color: "bg-orange-100 text-orange-700 border-orange-300" },
                { label: "🧪 Chemistry", color: "bg-teal-100 text-teal-700 border-teal-300" },
                { label: "🧬 Biology", color: "bg-yellow-100 text-yellow-700 border-yellow-400" },
                { label: "📐 App. Maths", color: "bg-purple-100 text-purple-700 border-purple-300" },
              ].map((subject, idx) => (
                <motion.div
                  key={subject.label}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + idx * 0.08,
                    type: "spring",
                    stiffness: 120,
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: idx % 2 === 0 ? 3 : -3,
                    transition: { duration: 0.2 }
                  }}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border-2 font-bold text-sm sm:text-base cursor-default shadow-[0_4px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all ${subject.color}`}
                >
                  {subject.label}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-4 rounded-2xl border-2 border-white shadow-lg w-fit transform -rotate-1 hover:rotate-0 transition-transform"
            >
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-2 border-white flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md transform -rotate-3 hover:rotate-0 transition-transform cursor-default">P3-P7</div>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md hover:-translate-y-1 transition-transform cursor-default">S1-S3</div>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-white flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md transform rotate-3 hover:rotate-0 transition-transform cursor-default">N5+</div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">Catering to all levels</span>
                <span className="text-sm sm:text-base font-black text-indigo-900 leading-tight">Primary to Adv. Highers</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/courses/all-courses"
              className="w-full sm:w-auto relative bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-[0_8px_0_rgb(217,119,6)] hover:shadow-[0_4px_0px_rgb(217,119,6)] ease-in-out hover:translate-y-1 active:translate-y-2 active:shadow-none text-lg overflow-hidden"
            >
              <span className="relative z-10">Explore Courses</span>
              <span className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-transparent rounded-full"></span>
            </a>
            <a
              href="/gallery"
              className="w-full sm:w-auto relative bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-[0_8px_0_rgb(37,99,235)] hover:shadow-[0_4px_0px_rgb(37,99,235)] ease-in-out hover:translate-y-1 active:translate-y-2 active:shadow-none text-lg overflow-hidden"
            >
              <span className="relative z-10">View Gallery</span>
              <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-transparent rounded-full"></span>
            </a>
          </div>
          {/* <div className="pt-4 z-10 max-w-xl flex items-center justify-center gap-3">
            <span className="text-yellow-400 text-3xl drop-shadow-glow animate-bounce-slow">
              ⭐
            </span>
            <span className="relative inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 via-white to-blue-100 shadow-lg border border-yellow-200">
              <span className="text-indigo-600 font-bold text-lg md:text-xl tracking-wide drop-shadow-[0_1.2px_1.2px_rgba(99,102,241,0.2)]">
                Where Learning is Always an Adventure!
              </span>
              <span className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-200 rounded-full blur-sm opacity-70"></span>
              <span className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-200 rounded-full blur-sm opacity-70"></span>
            </span>
            <span className="text-yellow-400 text-3xl drop-shadow-glow animate-bounce-slow">
              ⭐
            </span>
          </div> */}


        </div>
      </div>
    </div>
  );
};

export default Hero;
