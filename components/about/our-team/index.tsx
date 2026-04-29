"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ma'aruf Razzak",
    title: "LAWYER",
    description: "15 YEARS EXPERIENCE IN LEGAL, PROPERTY & CHARITY SECTORS",
    imageUrl: "/images/about/team1.jpg", // Replace with actual image
    color: "bg-blue-200",
    icon: "⚖️",
  },
  {
    name: "Shovon Mostofa",
    title: "AEROSPACE ENGINEER",
    description: "6+ YEARS EXPERIENCE IN TEACHING NATIONAL 5",
    imageUrl: "/images/about/team5.jpg", // Replace with actual image
    color: "bg-pink-200",
    icon: "🚀",
  },

  {
    name: "Shabbir Rahman",
    title: "CHARTERED ACCOUNTANT",
    description:
      "Managing Director of A2Z Accounting Solutions Limited Former Accounting Supervisor at Subsea 7",
    imageUrl: "/images/about/team3.jpg", // Replace with actual image
    color: "bg-yellow-200",
    icon: "🔢",
  },
  {
    name: "Dr. Sheikh Zahidul Islam",
    title: "UNIVERSITY LECTURER",
    description: "15+ YEARS EXPERIENCE IN TEACHING IN COLLEGE & UNIVERSITY",
    imageUrl: "/images/about/team4.jpg", // Replace with actual image
    color: "bg-purple-200",
    icon: "🎓",
  },
];

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          // y: 50,
          rotate: index % 2 === 0 ? -3 : 3,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            bounce: 0.25,
          },
        },
      }}
      whileHover={{
        scale: 1.01,
        // rotate: index % 2 === 0 ? 2 : -2,
        // y: -10,
        transition: { duration: 0.3 },
      }}
      className={`${member.color} w-full md:max-w-[344px] lg:max-w-[304px] xl:max-w-[388px] 2xl:max-w-[474px] rounded-2xl p-6 text-center shadow-lg border-4 border-white overflow-hidden relative`}
    >
      <div className="z-10 relative">
        {/* Image container with fun border */}
        <div className="relative mx-auto mb-4 w-40 h-40">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-dashed"
            style={{ borderColor: getComplementaryColor(member.color) }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 overflow-hidden rounded-full border-4 border-white">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-fit cover"
            />
          </div>
        </div>

        {/* Name with fun underline */}
        <div className="relative mb-2">
          <h3 className="text-xl font-bold text-gray-800 mb-1 font-comic">
            {member.name}
          </h3>
          {/* <motion.div
            className="h-2 w-1/2 mx-auto rounded-full"
            style={{ backgroundColor: getComplementaryColor(member.color) }}
            animate={{
              width: ["40%", "60%", "40%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          /> */}
        </div>

        {/* Title with cartoon-style bubble */}
        <div className="relative mb-4">
          <motion.div
            className="relative py-2 px-4 rounded-full text-white font-semibold text-sm mb-3 inline-block font-['Comic_Sans_MS',cursive,sans-serif]"
            style={{ backgroundColor: getComplementaryColor(member.color) }}
            animate={{
              y: [0, -3, 0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {member.title}
            <div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
              style={{ borderTopColor: getComplementaryColor(member.color) }}
            ></div>
          </motion.div>
        </div>

        <p className="text-gray-700 font-medium font-['Comic_Sans_MS',cursive,sans-serif]">
          {member.description}
        </p>
      </div>
    </motion.div>
  );
};

// Helper function to get complementary colors for backgrounds
function getComplementaryColor(bgColor: string): string {
  switch (bgColor) {
    case "bg-blue-200":
      return "#4F46E5"; // indigo-600
    case "bg-green-200":
      return "#059669"; // emerald-600
    case "bg-yellow-200":
      return "#D97706"; // amber-600
    case "bg-purple-200":
      return "#7C3AED"; // violet-600
    case "bg-pink-200":
      return "#DB2777"; // pink-600
    default:
      return "#2563EB"; // blue-600
  }
}

const OurTeam: React.FC = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const titleControls = useAnimation();

  useEffect(() => {
    if (isTitleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("hidden");
    }
  }, [isTitleInView, titleControls]);

  return (
    <section className="pt-20 pb-12 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative">
        {/* Title with animation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#4a6bcc] mb-4 font-['Comic_Sans_MS',cursive,sans-serif]">
            Our Management Team
          </h2>
          <p className="text-xl max-w-3xl  mx-auto text-gray-600 font-['Comic_Sans_MS',cursive,sans-serif]">
            Introducing our exceptional Management Team – a dynamic group of
            four accomplished professionals. Their diverse expertise and
            dedication drive the success of our innovative educational
            initiatives.
          </p>
        </div>

        {/* Team members grid */}
        <div className="flex flex-wrap justify-center gap-8 relative z-10">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Add a fun decorative path connecting the team members */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M200,200 C300,100 400,300 600,200 C800,100 900,300 1000,200"
              stroke="url(#teamGradient)"
              strokeWidth="4"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              fill="none"
            />
            <defs>
              <linearGradient
                id="teamGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop stopColor="#93c5fd" offset="0%" />
                <stop stopColor="#c4b5fd" offset="50%" />
                <stop stopColor="#fbcfe8" offset="100%" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Add global styles for the component */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap");

        .font-comic {
          font-family: "Comic Neue", cursive;
        }
      `}</style>
    </section>
  );
};

export default OurTeam;
