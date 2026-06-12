"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import CustomButton from "@/components/common/CustomButton";
import { usePathname } from "next/navigation"; // Import usePathname to get current path

// Define types for the MobileMenu props
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ title: string; href: string }>;
  currentPath: string; // Add currentPath to props
}

// Separate component for mobile menu to improve organization
const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  currentPath,
}: MobileMenuProps) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    return currentPath === href;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full screen backdrop with maximum z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />

          {/* Mobile menu content with maximum z-index */}
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-gradient-to-b from-sky-500 to-blue-400 flex flex-col pt-24 px-6"
            style={{ zIndex: 9999 }}
          >
            <div className="absolute top-6 right-6">
              <button
                onClick={onClose}
                className="text-white text-3xl focus:outline-none"
                aria-label="Close menu"
              >
                <IoMdClose />
              </button>
            </div>{" "}
            <nav className="flex flex-col space-y-6 items-center mt-4">
              {navItems.map((item) => (
                <motion.div key={item.title} variants={menuItemVariants}>
                  <Link
                    href={item.href}
                    className={`text-white text-xl font-medium transition-colors flex items-center justify-center px-6 py-3 rounded-full text-center relative overflow-hidden ${
                      isActive(item.href)
                        ? `bg-blue-600/50 text-yellow-300 font-bold ${
                            item.title === "NEWS & OFFERS"
                              ? "animate-celebration-glow animate-celebration-pulse"
                              : ""
                          }`
                        : `bg-blue-600/40 hover:text-yellow-100 ${
                            item.title === "NEWS & OFFERS"
                              ? "animate-celebration-glow animate-celebration-pulse"
                              : ""
                          }`
                    }`}
                    onClick={onClose}
                  >
                    {/* Always show celebration effects for NEWS & OFFERS in mobile */}
                    {item.title === "NEWS & OFFERS" && (
                      <>
                        {/* Mobile sparkle elements - smaller and fewer */}
                        <div
                          className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="absolute -top-2 right-3 w-1 h-1 bg-pink-300 rounded-full animate-sparkle"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-sparkle"
                          style={{ animationDelay: "1s" }}
                        />
                        <div
                          className="absolute -bottom-2 left-3 w-1 h-1 bg-purple-300 rounded-full animate-sparkle"
                          style={{ animationDelay: "1.5s" }}
                        />
                        <div
                          className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-sparkle"
                          style={{ animationDelay: "0.3s" }}
                        />
                        <div
                          className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-sparkle"
                          style={{ animationDelay: "0.8s" }}
                        />

                        {/* Mobile confetti elements */}
                        <div
                          className="absolute -top-3 left-2 w-1 h-2 bg-yellow-400 animate-confetti"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="absolute -top-3 right-2 w-1 h-2 bg-pink-400 animate-confetti"
                          style={{ animationDelay: "0.4s" }}
                        />
                        <div
                          className="absolute -top-3 left-4 w-1 h-1 bg-blue-400 animate-confetti"
                          style={{ animationDelay: "0.8s" }}
                        />
                        <div
                          className="absolute -top-3 right-4 w-1 h-1 bg-purple-400 animate-confetti"
                          style={{ animationDelay: "1.2s" }}
                        />

                        {/* Mobile shimmer overlay */}
                        <div className="absolute inset-0 rounded-full animate-celebration-shimmer pointer-events-none" />
                      </>
                    )}
                    <span
                      className={`relative z-10 ${
                        item.title === "NEWS & OFFERS"
                          ? "font-bold animate-celebration-bounce"
                          : ""
                      }`}
                    >
                      {item.title}
                    </span>{" "}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/register"
                  className={`px-8 py-3 rounded-full inline-block font-semibold shadow-lg border-b-4 active:border-b-0 active:border-t-0 active:shadow-inner active:translate-y-1 hover:-translate-y-1 transform transition-all duration-200 focus:outline-none
                ${
                  currentPath === "/register"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-700 border-yellow-600 font-bold"
                    : "bg-gradient-to-r from-yellow-300 to-yellow-400 text-white border-yellow-500 hover:from-yellow-200 hover:to-yellow-300 hover:text-blue-900"
                }
                `}
                  onClick={onClose}
                >
                  Book a Free Lesson
                </Link>
              </motion.div>
            </nav>
            {/* Social Media Icons */}
            <motion.div
              variants={menuItemVariants}
              className="mt-auto mb-10 flex justify-center space-x-6"
            >
              <a
                href="#"
                className="text-white hover:text-yellow-200 transition-colors bg-blue-600/40 p-3 rounded-full"
                aria-label="Visit our Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-200 transition-colors bg-blue-600/40 p-3 rounded-full"
                aria-label="Visit our Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-200 transition-colors bg-blue-600/40 p-3 rounded-full"
                aria-label="Visit our LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  // Check if we're on the home page
  const isHomePage = pathname === "/" || pathname === "/home";

  // Determine which logo to show
  const shouldShowDarkLogo = isScrolled || isHomePage;

  // Navigation items
  const navItems = [
    { title: "COURSES", href: "/courses/all-courses" },
    { title: "NEWS & OFFERS", href: "/news-offers" },
    { title: "GALLERY", href: "/gallery" },
    { title: "ABOUT", href: "/about" },
  ];

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing window to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <header
        className={`fixed w-full z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-4 border-slate-800/50 backdrop-blur-sm"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {" "}
          {/* Logo */}
          <a href="/" className="relative focus:outline-none rounded">
            <div className="flex items-center">
              <Image
                src={
                  shouldShowDarkLogo
                    ? "/ilearners-logo-dark.svg"
                    : "/ilearners-logo-white.svg"
                }
                alt="iLearner's Hub Logo"
                width={160}
                height={55}
                className={`w-[140px] md:w-[170px] h-auto transition-all duration-300 ease-in-out ${
                  isScrolled ? "scale-100" : "scale-105"
                }`}
                priority
              />
            </div>
          </a>
          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`font-semibold transition-all duration-300 transform relative px-3 py-1 rounded-2xl overflow-hidden group shadow-lg ${
                    isActive(item.href)
                      ? `bg-gradient-to-r from-[#fbbf24] to-[#f472b6] text-blue-50 scale-105 ${
                          item.title === "NEWS & OFFERS"
                            ? "animate-celebration-glow animate-celebration-pulse"
                            : ""
                        }`
                      : `${
                          item.title === "NEWS & OFFERS"
                            ? "bg-gradient-to-r from-pink-400 to-purple-400 text-gray-50 animate-celebration-glow animate-celebration-pulse"
                            : "bg-gradient-to-r from-sky-400 to-blue-300 text-gray-50"
                        } hover:bg-gradient-to-r hover:from-[#fbbf24] hover:to-[#f472b6] hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:rotate-x-6 hover:rotate-y-3`
                  }`}
                  style={{
                    perspective: "600px",
                  }}
                >
                  {/* Always show celebration effects for NEWS & OFFERS */}
                  {item.title === "NEWS & OFFERS" && (
                    <>
                      {/* Sparkle elements */}
                      <div
                        className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full animate-sparkle"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="absolute -top-3 right-4 w-2 h-2 bg-pink-300 rounded-full animate-sparkle"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div
                        className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-300 rounded-full animate-sparkle"
                        style={{ animationDelay: "1s" }}
                      />
                      <div
                        className="absolute -bottom-3 left-4 w-2 h-2 bg-purple-300 rounded-full animate-sparkle"
                        style={{ animationDelay: "1.5s" }}
                      />
                      <div
                        className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-sparkle"
                        style={{ animationDelay: "0.3s" }}
                      />
                      <div
                        className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-sparkle"
                        style={{ animationDelay: "0.8s" }}
                      />

                      {/* Confetti elements */}
                      <div
                        className="absolute -top-4 left-2 w-1 h-3 bg-yellow-400 animate-confetti"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="absolute -top-4 right-2 w-1 h-3 bg-pink-400 animate-confetti"
                        style={{ animationDelay: "0.4s" }}
                      />
                      <div
                        className="absolute -top-4 left-6 w-1 h-2 bg-blue-400 animate-confetti"
                        style={{ animationDelay: "0.8s" }}
                      />
                      <div
                        className="absolute -top-4 right-6 w-1 h-2 bg-purple-400 animate-confetti"
                        style={{ animationDelay: "1.2s" }}
                      />

                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 rounded-2xl animate-celebration-shimmer pointer-events-none" />
                    </>
                  )}

                  <span
                    className={`relative z-10 block transition-transform duration-300 ${
                      isActive(item.href)
                        ? `font-bold ${
                            item.title === "NEWS & OFFERS"
                              ? "animate-celebration-bounce"
                              : ""
                          }`
                        : `${
                            item.title === "NEWS & OFFERS"
                              ? "font-bold animate-celebration-bounce"
                              : "group-hover:translate-y-[-120%] group-hover:opacity-0"
                          }`
                    }`}
                  >
                    {item.title}
                  </span>
                  {!isActive(item.href) && item.title !== "NEWS & OFFERS" && (
                    <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-0 transition-transform duration-300 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 bg-clip-text text-transparent animate-gradient-x">
                        {item.title}
                      </span>
                    </span>
                  )}
                  {/* 3D hover background effect */}
                  <span
                    className={`absolute inset-0 rounded-2xl z-0 transition-all duration-300 ${
                      isActive(item.href)
                        ? "opacity-100 scale-105 blur-sm"
                        : "opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:blur-sm"
                    }`}
                    style={{
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                      filter: "blur(4px)",
                    }}
                  />
                </Link>
              ))}
            </div>
          </nav>
          {/* Register Button - Right */}
          <div className="hidden h-[56px] lg:block">
            <CustomButton
              text="Book a Free Lesson"
              href="/register"
              className={`hover:translate-y-0 border-yellow-600 transition-colors duration-200 ${
                isActive("/register")
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold shadow-lg"
                  : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:bg-opacity-90"
              }`}
            />
          </div>
          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden z-40 text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 rounded-full p-1.5"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <HiMenuAlt4
              className={isScrolled ? "text-slate-950" : "text-slate-950"}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* Separate Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={pathname} // Pass the current path to the mobile menu
      />
    </>
  );
};

export default Header;
