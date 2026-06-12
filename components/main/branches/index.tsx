"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const branches = [
  {
    id: "bridge-of-don",
    tag: "🎉 NEW BRANCH",
    tagColor: "bg-orange-500 text-white",
    name: "Bridge of Don Branch",
    address: "Broadfold Business Centre",
    city: "Bridge of Don",
    postcode: "AB23 8EE",
    isNew: true,
    headerGradient: "from-orange-500 to-pink-600",
    pinColor: "#F97316",
    glowColor: "rgba(249,115,22,0.15)",
    borderColor: "border-orange-100",
    image: "https://live.staticflickr.com/982/28459017558_20a54149ab_b.jpg",
  },
  {
    id: "city-centre",
    tag: "",
    tagColor: "",
    name: "City Centre Branch",
    address: "1-3 Albyn Terrace",
    city: "Aberdeen",
    postcode: "AB10 1YP",
    isNew: false,
    headerGradient: "from-blue-600 to-indigo-700",
    pinColor: "#6366F1",
    glowColor: "rgba(99,102,241,0.15)",
    borderColor: "border-indigo-100",
    image: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=ZKYUGy0jjkWkjSUyBBhJeg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=4.0405807&pitch=0&thumbfov=100",
  },
];

// Animated map pin SVG
const MapPin = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 50" fill="none" className="w-10 h-10 drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2C11.163 2 4 9.163 4 18c0 12 16 30 16 30s16-18 16-30c0-8.837-7.163-16-16-16z"
      fill={color}
    />
    <circle cx="20" cy="18" r="6" fill="white" />
  </svg>
);

// Sparkle particle for the new branch card
const Sparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {[
      { top: "10%", left: "85%", delay: 0, size: "w-1.5 h-1.5", color: "bg-yellow-300" },
      { top: "70%", left: "90%", delay: 0.4, size: "w-2 h-2", color: "bg-pink-300" },
      { top: "20%", left: "92%", delay: 0.8, size: "w-1 h-1", color: "bg-orange-200" },
      { top: "50%", left: "88%", delay: 1.2, size: "w-1.5 h-1.5", color: "bg-yellow-200" },
      { top: "85%", left: "82%", delay: 0.6, size: "w-1 h-1", color: "bg-white" },
    ].map((s, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${s.size} ${s.color} opacity-80`}
        style={{ top: s.top, left: s.left }}
        animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: s.delay, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export default function BranchSection() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-gradient-to-b from-blue-50/40 to-white">
      <div className="container mx-auto px-6 relative z-10">

        {/* ── Animated headline ── */}
        <div className="text-center mb-16">
          {/* NEWS ticker badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
            </span>
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
              Latest News
            </span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
              We&apos;re Expanding!{" "}
            </span>
            <span className="relative inline-block mx-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-orange-600 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.3)]">
                Two Locations
              </span>
              {/* Underline squiggle */}
              <motion.svg
                viewBox="0 -2 200 20"
                className="hidden lg:block absolute -bottom-6 left-0 w-full"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.path
                  d="M0 8 Q25 2 50 8 Q75 14 100 8 Q125 2 150 8 Q175 14 200 8"
                  fill="none"
                  stroke="url(#sqg)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sqg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
              {" "}Across Aberdeen!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-indigo-600">iLearner&apos;s Hub</span> is now serving families across{" "}
            <span className="font-bold text-blue-600">Aberdeen</span> — find your nearest branch below.
          </motion.p>
        </div>

        {/* ── Branch cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl overflow-hidden shadow-2xl border ${branch.borderColor} cursor-default group flex flex-col`}
              style={{ boxShadow: `0 20px 60px ${branch.glowColor}, 0 4px 20px rgba(0,0,0,0.07)` }}
            >
              {/* Sparkles for new branch only */}
              {branch.isNew && <Sparkles />}

              {/* Card Image Area */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${branch.isNew ? "orange-900" : "indigo-900"}/60 opacity-80`} />
                
                {/* Status tag overlaid on image */}
                {branch.tag && (
                  <div className="absolute top-4 left-4 z-20">
                    <motion.span
                      className={`inline-block text-[11px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full ${branch.tagColor} shadow-md backdrop-blur-sm bg-opacity-90`}
                      animate={branch.isNew ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      {branch.tag}
                    </motion.span>
                  </div>
                )}

                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="text-white text-2xl font-extrabold leading-tight drop-shadow-md">
                    {branch.name}
                  </h3>
                </div>
              </div>

              {/* Card body — white panel */}
              <div className="bg-white px-6 pt-8 pb-8 relative flex-1 flex flex-col">
                {/* Floating pin — overlapping image & body */}
                <motion.div
                  className="absolute -top-6 right-6 z-30"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <MapPin color={branch.pinColor} />
                </motion.div>

                {/* Address */}
                <div className="flex-1">
                  <p className="text-gray-800 font-bold text-lg leading-snug mb-1">{branch.address}</p>
                  <p className="text-gray-600 text-base mb-1">{branch.city}</p>
                  <p className="text-gray-400 text-sm font-mono bg-gray-50 inline-block px-2 py-1 rounded">{branch.postcode}</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-dashed border-gray-200" />

                {/* Get Directions CTA */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${branch.address}, ${branch.city}, ${branch.postcode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white bg-gradient-to-r ${branch.headerGradient} shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 w-full`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                  </svg>
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
