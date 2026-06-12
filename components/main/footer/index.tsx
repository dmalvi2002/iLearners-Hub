"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const quickLinks = [
    { label: "Courses", href: "/courses/all-courses" },
    { label: "News & Offers", href: "/news-offers" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Register", href: "/register" },
  ];

  const resourceLinks = [
    { label: "Primary", href: "/courses/primary" },
    { label: "Secondary", href: "/courses/secondary" },
    { label: "National 5", href: "/courses/national-5" },
    { label: "Highers", href: "/courses/highers" },
    { label: "Advanced Highers", href: "/courses/advanced-highers" },
  ];
  const currentYear = new Date().getFullYear(); // Function to handle navigation to course categories with smooth scrolling
  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Get current path and target slug
    const currentPath = window.location.pathname;
    const targetSlug = href.split("/").pop() || "all-courses";
    const currentSlug = currentPath.split("/").pop() || ""; // If we're already on the target course page, just scroll
    if (currentPath.startsWith("/courses/") && currentSlug === targetSlug) {
      console.log(
        "🔄 Same page scroll attempt - Current:",
        currentSlug,
        "Target:",
        targetSlug
      );

      // Use a small delay to ensure any pending renders are complete
      setTimeout(() => {
        const coursesContent = document.getElementById("courses-content");
        console.log("📍 Found courses-content element:", !!coursesContent);

        if (coursesContent) {
          const elementPosition = coursesContent.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 100;

          console.log(
            "📏 Scroll calculation - Element top:",
            elementPosition,
            "Offset:",
            offsetPosition
          );

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
      return;
    } // Navigate to the new course page
    console.log("🚀 Navigating from", currentSlug, "to", targetSlug);
    router.push(href, { scroll: false });

    // Wait for navigation and then scroll
    const scrollToCoursesContent = (attempts = 0) => {
      const maxAttempts = 15;
      const coursesContent = document.getElementById("courses-content");

      console.log(
        `📍 Scroll attempt ${attempts + 1}/${maxAttempts} - Found element:`,
        !!coursesContent
      );

      if (coursesContent) {
        requestAnimationFrame(() => {
          const elementPosition = coursesContent.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 100;

          console.log(
            "📏 Cross-page scroll - Element top:",
            elementPosition,
            "Offset:",
            offsetPosition
          );

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      } else if (attempts < maxAttempts) {
        setTimeout(() => scrollToCoursesContent(attempts + 1), 100);
      } else {
        console.log(
          "❌ Failed to find courses-content after",
          maxAttempts,
          "attempts"
        );
      }
    };

    // Start scroll attempt after navigation
    setTimeout(() => scrollToCoursesContent(), 200);
  };

  return (
    <footer className="relative py-16 bg-gradient-to-b from-sky-100 to-indigo-100 border-t border-blue-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="iLearner's Hub Logo"
                width={280}
                height={90}
                className="w-48 sm:w-56 md:w-64 lg:w-[280px] h-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4">
              Boost your exam performance with our expert tutoring. Contact us
              today to discuss your learning goals and book a session with our
              specialist tutors. Your academic success journey starts here!
            </p>
            <div className="flex gap-4 mt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: [
                      "#FDE68A",
                      "#A7F3D0",
                      "#BAE6FD",
                      "#DDD6FE",
                      "#FBCFE8",
                    ][i % 5],
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.includes("/courses")) {
                        handleCategoryClick(e, link.href);
                      }
                    }}
                    className="text-indigo-600 hover:text-purple-700 transition-colors duration-300
                     relative group"
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400
                       group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleCategoryClick(e, link.href)}
                    className="text-indigo-600 hover:text-purple-700 transition-colors duration-300
                           relative group"
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400
                                 group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact/Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-500 mt-1 shrink-0" />
                <div>
                  <span className="block font-semibold text-indigo-700 text-sm">City Centre:</span>
                  <span className="text-gray-600 block leading-tight">1-3 Albyn Terrace, Aberdeen AB10 1YP</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-500 mt-1 shrink-0" />
                <div>
                  <span className="block font-semibold text-orange-600 text-sm">Bridge of Don:</span>
                  <span className="text-gray-600 block leading-tight">Broadfold Business Centre, AB23 8EE</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <FaPhone className="text-indigo-500 shrink-0" />
                <p className="text-gray-600">+44 7448 231096</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500 shrink-0" />
                <p className="text-gray-600">info@ilearnershub.co.uk</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-blue-200 text-center"
        >
          <div className="text-indigo-500">
            © {currentYear} iLearner's Hub. All rights reserved. Where learning
            is fun!
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
