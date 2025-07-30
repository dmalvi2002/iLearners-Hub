"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { galleryItems } from "./galleryData";

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<number, boolean>
  >({});
  const [imageErrorStates, setImageErrorStates] = useState<
    Record<number, boolean>
  >({}); // Helper function to get category counts
  const getCategoryCount = (category: string) => {
    if (category === "all") return galleryItems.length;
    if (category === "photos")
      return galleryItems.filter((item) => item.type === "image").length;
    if (category === "videos")
      return galleryItems.filter((item) => item.type === "video").length;
    return galleryItems.filter((item) => item.category === category).length;
  };

  // Image loading handlers
  const handleImageLoad = (itemId: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleImageError = (itemId: number) => {
    setImageErrorStates((prev) => ({ ...prev, [itemId]: true }));
    setImageLoadingStates((prev) => ({ ...prev, [itemId]: false }));
  };
  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "photos") return item.type === "image";
    if (selectedCategory === "videos") return item.type === "video";
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setCurrentImageIndex(null);
  };
  const navigateImage = (direction: "next" | "prev") => {
    if (currentImageIndex === null) return;

    if (direction === "next") {
      setCurrentImageIndex((currentImageIndex + 1) % filteredItems.length);
    } else {
      setCurrentImageIndex(
        (currentImageIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentImageIndex !== null) {
        switch (event.key) {
          case "Escape":
            closeLightbox();
            break;
          case "ArrowLeft":
            navigateImage("prev");
            break;
          case "ArrowRight":
            navigateImage("next");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex, filteredItems.length]);

  return (
    <div className="h-auto bg-transparent pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {" "}
        <div className="mb-16 text-center">
          <h2 className="mb-4 leading-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl drop-shadow-lg">
            Our Learning Center Gallery
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-indigo-700">
            Take a peek at our colorful classrooms, exciting activities, and
            happy learning moments!
          </p>
        </div>{" "}
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <CategoryButton
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            count={getCategoryCount("all")}
          >
            All Content
          </CategoryButton>
          <CategoryButton
            active={selectedCategory === "photos"}
            onClick={() => setSelectedCategory("photos")}
            count={getCategoryCount("photos")}
          >
            Photos
          </CategoryButton>
          <CategoryButton
            active={selectedCategory === "videos"}
            onClick={() => setSelectedCategory("videos")}
            count={getCategoryCount("videos")}
          >
            Videos
          </CategoryButton>
        </div>{" "}
        {/* Results Counter */}
        {/* {filteredItems.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "item" : "items"}
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-semibold capitalize">
                    {selectedCategory}
                  </span>
                </span>
              )}
            </p>
          </div>
        )} */}
        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 mx-auto max-w-md shadow-lg">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Nothing Here Yet!
              </h3>
              <p className="text-gray-500 mb-4">
                We haven't added any{" "}
                {selectedCategory === "all" ? "content" : selectedCategory} to
                our gallery yet.
              </p>
              <p className="text-sm text-gray-400">
                Check back soon for amazing photos and videos!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {" "}
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 group"
                whileHover={{ scale: 1.03 }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.type}: ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <div className="aspect-w-4 aspect-h-3 relative h-56">
                  {/* Loading Spinner */}
                  {imageLoadingStates[item.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  )}

                  {/* Error State */}
                  {imageErrorStates[item.id] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-2xl">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-gray-500 text-sm">Failed to load</p>
                    </div>
                  ) : item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-2xl object-cover"
                      onLoadStart={() =>
                        setImageLoadingStates((prev) => ({
                          ...prev,
                          [item.id]: true,
                        }))
                      }
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <>
                      {/* Video Thumbnail */}
                      <Image
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        // fetching thumbnail image
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="rounded-2xl object-cover"
                        onLoadStart={() =>
                          setImageLoadingStates((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }))
                        }
                        onLoad={() => handleImageLoad(item.id)}
                        onError={() => handleImageError(item.id)}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                        <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-8 h-8 text-indigo-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Category Badge */}
                {/* <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "video"
                        ? "bg-red-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {item.type === "video" ? "📹 Video" : "📷 Photo"}
                  </span>
                </div> */}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {/* <div>
                    <p className="text-white text-sm font-medium capitalize mb-1">
                      {item.category}
                    </p>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {item.alt}
                    </p>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        )}{" "}
        {/* Lightbox */}
        {currentImageIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300 transition-colors"
            >
              ×
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10"
                >
                  <FaArrowLeft />
                </button>

                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10"
                >
                  <FaArrowRight />
                </button>
              </>
            )}

            <div className="relative w-full max-w-4xl max-h-[80vh] h-[70vh]">
              {filteredItems[currentImageIndex].type === "image" ? (
                <Image
                  src={filteredItems[currentImageIndex].src}
                  alt={filteredItems[currentImageIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : filteredItems[currentImageIndex].youtubeId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${filteredItems[currentImageIndex].youtubeId}?autoplay=0&loop=1&playlist=${filteredItems[currentImageIndex].youtubeId}&rel=0&modestbranding=1&controls=1&disablekb=1`}
                  title={filteredItems[currentImageIndex].alt}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-2xl"
                ></iframe>
              ) : (
                <video
                  src={filteredItems[currentImageIndex].src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error("Video failed to load:", e);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="absolute bottom-6 text-white text-center w-full px-4">
              <div className="bg-black/50 rounded-lg p-4 max-w-2xl mx-auto">
                {/* <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      filteredItems[currentImageIndex].type === "video"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {filteredItems[currentImageIndex].type === "video"
                      ? "Video"
                      : "Photo"}
                  </span>
                  <span className="text-sm text-gray-300 capitalize">
                    {filteredItems[currentImageIndex].category}
                  </span>
                </div>
                <p className="text-lg">
                  {filteredItems[currentImageIndex].alt}
                </p> */}
                {filteredItems.length > 1 && (
                  <p className="text-sm text-gray-400 mt-2">
                    {currentImageIndex + 1} of {filteredItems.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type CategoryButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
};

const CategoryButton: React.FC<CategoryButtonProps> = ({
  active,
  onClick,
  children,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 inline-block py-3 rounded-full
      font-medium
       shadow-lg hover:shadow-xl
       border-b-4
       active:border-b-0 active:border-t-0 active:shadow-inner
       active:translate-y-1 hover:-translate-y-1
       transform transition-all duration-200
       focus:outline-none text-indigo-600 border-blue-200 ${
         active
           ? "bg-indigo-600 border-indigo-700 text-white"
           : "bg-blue-100 border-blue-300 text-indigo-600 "
       }`}
    >
      <span className="flex items-center gap-2">
        {children}
        {count !== undefined && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${
              active ? "bg-white/20" : "bg-indigo-100"
            }`}
          >
            {count}
          </span>
        )}
      </span>
    </button>
  );
};

export default GalleryPage;
