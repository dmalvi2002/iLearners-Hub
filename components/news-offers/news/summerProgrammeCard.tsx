"use client";
import React from "react";
import { ArrowRight, Calendar, Clock, MapPin, CheckCircle2, Gamepad2, GraduationCap, Coffee } from "lucide-react";
import { CardDataType } from "./cardData";
import Link from "next/link";
import { motion } from "framer-motion";

const SummerProgrammeCard: React.FC<{ card: CardDataType }> = ({ card }) => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-12 relative mt-8 px-2 sm:px-4">
      
      {/* Animated Banner Badge */}
      <motion.div 
        initial={{ y: 0, rotate: -10 }}
        animate={{ 
          y: [-4, 4, -4],
        }}
        transition={{ 
          duration: 3, 
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute -top-4 -left-1 sm:-top-6 sm:-left-4 md:-left-8 z-20 bg-red-600 text-white font-black text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg shadow-xl border-2 border-white max-w-[90%] sm:max-w-none"
      >
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          🔥 <span className="whitespace-normal sm:whitespace-nowrap leading-tight">LIMITED SPACE AVAILABLE</span>
        </span>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
      </motion.div>

      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-3xl sm:rounded-[2rem] transform -rotate-1 scale-[1.01] opacity-40 z-0 hidden sm:block"></div>
        
        <div className="rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border-2 sm:border-4 border-white bg-[#F0F7FF] relative z-10 p-4 sm:p-8 md:p-12">
          
          {/* Decorative Background Elements - HIDDEN ON MOBILE */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
            {/* Dots Pattern Top Right */}
            <div className="absolute -top-10 -right-10 w-64 h-64" style={{ backgroundImage: 'radial-gradient(#1068B2 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
            {/* Dots Pattern Bottom Left */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64" style={{ backgroundImage: 'radial-gradient(#1068B2 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Floating Geometric Shapes */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute top-20 left-10 text-[#1068B2] opacity-40">
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 22 20 2 20" /></svg>
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-48 right-16 text-[#FDBA31] opacity-50">
               <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-40 right-12 text-pink-400 opacity-40">
               <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-8 text-teal-400 opacity-40">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
            </motion.div>

            {/* Floating Paper Planes */}
            <motion.div animate={{ x: [0, 15, 0], y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 right-1/4 opacity-40 text-indigo-500">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" /></svg>
            </motion.div>
            <motion.div animate={{ x: [0, -10, 0], y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-32 left-1/4 opacity-30 text-indigo-600 rotate-45">
              <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" /></svg>
            </motion.div>
          </div>

          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 relative z-10 pt-4 sm:pt-0">
            <div className="inline-block bg-[#FDBA31] text-indigo-900 font-black px-4 py-1.5 sm:px-6 sm:py-2 rounded-full uppercase tracking-wider text-xs sm:text-sm md:text-base mb-3 sm:mb-4 shadow-sm border-2 border-white">
              {card.subtitle}
            </div>
            <h1 className="text-[#0E355C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight sm:leading-tight mb-4 tracking-tight break-words">
              BUILD SKILLS.<br className="hidden sm:block" />
              <span className="text-[#1068B2]"> LEARN.</span> <span className="text-[#FDBA31]">PLAY.</span>
            </h1>
            <div className="bg-[#0E355C] text-white px-4 py-2 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl inline-block font-bold text-sm sm:text-base md:text-lg mb-4 sm:mb-6 shadow-md transform sm:-rotate-1 leading-snug">
              Where Learning Meets Play This Summer
            </div>
            <p className="text-gray-700 text-base sm:text-xl font-medium max-w-2xl mx-auto px-2">
              {card.description}
            </p>
          </div>

          {/* Two columns for features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 max-w-5xl mx-auto relative z-10">
            {/* Games & Recreation */}
            <div className="bg-[#0A2346] rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 text-white shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <Gamepad2 className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 w-24 h-24 sm:w-40 sm:h-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-white/20 pb-3 sm:pb-4">
                <div className="bg-white p-2 sm:p-3 rounded-full text-[#0A2346] shadow-md inline-block">
                  <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-black text-[#FDBA31] text-xl sm:text-2xl tracking-wide leading-tight">GAMES &<br className="hidden sm:block" /> RECREATION</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
                {["Chess", "Table Tennis", "Scrabble", "Puzzle", "Carrom Board", "Uno, Ludo & Tic Tac"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                    <span className="text-sm sm:text-base font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning & Development */}
            <div className="bg-[#B9D8DB] rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 text-[#0A2346] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <GraduationCap className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 w-24 h-24 sm:w-40 sm:h-40 text-[#0A2346]/5 rotate-12 group-hover:-rotate-12 transition-transform duration-700" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-[#0A2346]/20 pb-3 sm:pb-4">
                <div className="bg-[#0A2346] p-2 sm:p-3 rounded-full text-white shadow-md inline-block">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-black text-[#0E355C] text-xl sm:text-2xl tracking-wide leading-tight">LEARNING &<br className="hidden sm:block" /> DEVELOPMENT</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4 relative z-10">
                {["Science Experiments", "Coding Basics", "IT Skills", "Presentation Skills", "Problem Solving Activities"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-[#0E355C]" />
                    <span className="text-sm sm:text-base font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom details and CTA */}
          <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-xl border-2 sm:border-4 border-blue-100 max-w-5xl mx-auto relative overflow-hidden z-10">
            {/* Background decoration */}
            <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 relative z-10">
              
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full lg:w-3/5">
                <div className="flex items-center gap-3 sm:gap-4 text-[#0E355C] font-bold text-sm sm:text-base md:text-lg bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#1068B2] shrink-0" />
                  <span>8:30 AM – 5:30 PM</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-[#0E355C] font-bold text-sm sm:text-base md:text-lg bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <span className="bg-[#1068B2] text-white rounded-lg px-2 sm:px-3 py-1 text-sm sm:text-base shrink-0">£</span>
                  <span>£40 per day</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-[#0E355C] font-bold text-sm sm:text-base md:text-lg bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#1068B2] shrink-0" />
                  <span>6 July – 14 Aug</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 text-[#0E355C] font-bold text-sm sm:text-base md:text-lg bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 shrink-0" />
                  <span>Enjoy free drinks</span>
                </div>
              </div>

              {/* Locations and Action */}
              <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-2/5 justify-center items-center lg:items-end mt-4 lg:mt-0">
                <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-sm">
                  <div className="bg-[#FDBA31] text-indigo-900 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-start sm:items-center gap-2 sm:gap-3 shadow-sm border border-orange-200">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-red-600 mt-0.5 sm:mt-0" />
                    <span className="leading-tight">City Centre: 1-3 Albyn Terrace, AB10 1YP</span>
                  </div>
                  <div className="bg-[#FDBA31] text-indigo-900 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-start sm:items-center gap-2 sm:gap-3 shadow-sm border border-orange-200">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-red-600 mt-0.5 sm:mt-0" />
                    <span className="leading-tight">Bridge of Don: Broadfold Business Centre</span>
                  </div>
                </div>

                <Link href={card.actionButton.url || "#"} className="w-full max-w-sm">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-black text-lg sm:text-xl py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl shadow-[0_4px_0_rgba(194,65,12,1)] sm:shadow-[0_6px_0_rgba(194,65,12,1)] hover:shadow-[0_2px_0_rgba(194,65,12,1)] sm:hover:shadow-[0_4px_0_rgba(194,65,12,1)] hover:translate-y-[2px] active:translate-y-[4px] sm:active:translate-y-[6px] active:shadow-none border-2 border-white flex items-center justify-center gap-2 sm:gap-3 transition-all"
                  >
                    <span>{card.actionButton.text}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SummerProgrammeCard;
