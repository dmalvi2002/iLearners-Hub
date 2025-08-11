type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: "classroom" | "activities" | "events" | "videos";
  type: "image" | "video";
  thumbnail?: string; // For video thumbnails
  youtubeId?: string; // For YouTube videos
};

export const galleryItems: GalleryItem[] = [
  // Classroom Images
  {
    id: 1,
    src: "/images/gallery/gp1.jpg",
    alt: "Bright classroom with colorful learning materials",
    category: "classroom",
    type: "image",
  },
  {
    id: 2,
    src: "/images/gallery/gp2.jpg",
    alt: "Clean and organized classroom",
    category: "classroom",
    type: "image",
  },
  {
    id: 3,
    src: "/images/gallery/gp3.jpg",
    alt: "Chair and table setup in a classroom",
    category: "classroom",
    type: "image",
  },

  // Activities Images
  {
    id: 4,
    src: "/images/gallery/gp4.jpg",
    alt: "Students engaged in a group activity",
    category: "activities",
    type: "image",
  },
  {
    id: 5,
    src: "/images/gallery/gp5.jpg",
    alt: "Teacher demonstrating a subject in class",
    category: "activities",
    type: "image",
  },
  {
    id: 7,
    src: "/images/gallery/gp7.jpg",
    alt: "Students studying in a group setting",
    category: "activities",
    type: "image",
  },
  {
    id: 8,
    src: "/images/gallery/gp8.jpg",
    alt: "Tutoring session with students",
    category: "activities",
    type: "image",
  },

  // Events Images
  {
    id: 9,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753843017/20250705_114516_t3cvfg.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842992/20250705_121308_rkbpuc.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842991/20250705_130032_jlaxpq.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842990/20250705_130030_mvloc8.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842988/20250705_121157_zftlol.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842987/20250705_121313_sljgcq.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 16,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842987/20250705_114539_yg16pf.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 17,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842986/20250705_114518_hu1pk5.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 18,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842985/20250705_121258_kdonkc.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 19,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842985/20250705_114537_ryytxk.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 21,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753842984/20250705_113420_cm0e8m.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 23,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0004_lpz9ul.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 24,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844342/IMG-20250730-WA0008_givzkg.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 25,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844342/IMG-20250730-WA0010_vivrbt.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 26,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0003_wfartw.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 27,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844342/IMG-20250730-WA0009_bo1bxp.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 28,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844342/IMG-20250730-WA0007_kkja8v.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 29,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0005_djcvdv.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 30,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0006_gaajvh.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 31,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0016_mawknl.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 32,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844341/IMG-20250730-WA0015_ops3tp.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 33,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844340/IMG-20250730-WA0012_wwpnlp.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 34,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844340/IMG-20250730-WA0013_pgip48.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 35,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844340/IMG-20250730-WA0014_sw48bn.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },
  {
    id: 36,
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1753844340/IMG-20250730-WA0011_imk9vu.jpg",
    alt: "Events booklet with colorful cover",
    category: "events",
    type: "image",
  },

  // Videos - Using existing sample video and creating placeholders
  {
    id: 9543,
    src: "",
    alt: "Interactive learning session with students",
    category: "videos",
    type: "video",
    youtubeId: "BnVDDiXIObU", // Example YouTube video ID. This id will also fetch thumbnail image!
  },
  {
    id: 4312,
    src: "",
    alt: "Virtual tour of our modern classrooms",
    category: "videos",
    type: "video",
    youtubeId: "yO7FFizmH_M",
  },
  {
    id: 11432,
    src: "",
    alt: "Exciting science experiments in action",
    category: "videos",
    type: "video",
    youtubeId: "7VcZvo4mmdM",
  },
  {
    id: 124123,
    src: "",
    alt: "Exciting science experiments in action",
    category: "videos",
    type: "video",
    youtubeId: "x91p_uqdcsU",
  },
  {
    id: 14323,
    src: "",
    alt: "Exciting science experiments in action",
    category: "videos",
    type: "video",
    youtubeId: "M2Jz3pL65vs",
  },
];
