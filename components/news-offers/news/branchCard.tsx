"use client";
import React, { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { CardDataType } from "./cardData";
import Link from "next/link";
import { motion } from "framer-motion";

const BranchCard: React.FC<{ card: CardDataType }> = ({ card }) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionPreviewLength = 140;
  const shouldTruncate = card.description.length > descriptionPreviewLength;

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      {/* Container with a fun, slightly rotated background effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-[2rem] transform rotate-1 scale-[1.02] opacity-50 z-0"></div>
        
        <div className="rounded-[2rem] shadow-2xl overflow-hidden border-4 border-orange-100 bg-white relative z-10 transition-transform duration-300 hover:-translate-y-2">
          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-6 lg:gap-10">
            
            {/* Left Section - Image */}
            <div className="lg:w-1/2 relative group">
              <div className="h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
                
                {/* Floating Tag */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-4 left-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm sm:text-base font-bold shadow-lg flex items-center gap-2 border-2 border-white/20 backdrop-blur-md">
                    {card.logo || "🎉"} <span>{card.category.toUpperCase()}</span>
                  </div>
                </motion.div>
                
                {/* Location overlay */}
                {card.location && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 w-fit">
                      <MapPin className="w-5 h-5 text-orange-400" />
                      <span>{card.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Text Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              {card.subtitle && (
                <div className="text-orange-500 font-extrabold tracking-wider uppercase mb-2 text-sm md:text-base">
                  {card.subtitle}
                </div>
              )}
              
              <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {card.title}
                </span>
              </h1>

              {/* Description */}
              <div className="bg-orange-50 rounded-2xl p-5 sm:p-6 border-2 border-orange-100 shadow-inner mb-8">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                  {expanded || !shouldTruncate
                    ? card.description
                    : `${card.description.substring(
                        0,
                        descriptionPreviewLength
                      )}...`}
                </p>

                {shouldTruncate && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-orange-600 font-bold mt-3 text-base hover:text-orange-800 transition-colors focus:outline-none flex items-center gap-1"
                  >
                    {expanded ? "Read Less" : "Read Full Announcement"}
                    <motion.div
                      animate={{ x: expanded ? -4 : 4 }}
                      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </button>
                )}
              </div>

              {/* Action Button */}
              <div>
                <Link href={card.actionButton.url || "#"} className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300
                    shadow-[0_6px_0_rgb(194,65,12)] hover:shadow-[0_4px_0_rgb(194,65,12)] hover:translate-y-[2px]
                    active:translate-y-[6px] active:shadow-none
                    border-2 border-orange-400 flex items-center gap-3 text-lg group"
                  >
                    <span>{card.actionButton.text}</span>
                    <span className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
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

export default BranchCard;
