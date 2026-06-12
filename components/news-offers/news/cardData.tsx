// TypeScript interface for our data structure
export interface CardDataType {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  actionButton: {
    text: string;
    url?: string;
  };
  category: string;
  date?: string;
  location?: string;
  capacity?: string;

  // OFFERS
  logo?: string;
  originalPrice?: string;
  salePrice?: string;
  discount?: string;
  validUntil?: string;
  phone?: string;
}

export const cardData: CardDataType[] = [
  // Summer Programme
  {
    id: "summer-1",
    title: "BUILD SKILLS. LEARN. PLAY.",
    subtitle: "STRUCTURED SUMMER PROGRAMME",
    description: "A balanced programme designed to improve focus, creativity, and confidence.",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1781236336/WhatsApp_Image_2026-06-12_at_3.57.04_AM_hhbhxk.jpg",
    actionButton: {
      text: "Explore The Programme",
      url: "/register",
    },
    category: "summer",
  },
  // Branch card: Bridge of Don
  {
    id: "branch-1",
    logo: "🏢",
    title: "We're Expanding! New Branch in Bridge of Don",
    subtitle: "GRAND OPENING",
    description:
      "We are absolutely thrilled to announce the opening of our brand new iLearner's Hub branch in Bridge of Don!\n\nDue to incredible demand from parents and students across Aberdeen, we're bringing our engaging, expert-led tutoring closer to you. Located at the Broadfold Business Centre, this modern, fully-equipped learning space offers the same supportive environment, qualified tutors, and tailored curriculum you've come to expect from us.\n\nEnrolment for the new branch is officially open for all primary and secondary subjects!",
    image: "https://live.staticflickr.com/982/28459017558_20a54149ab_b.jpg",
    actionButton: {
      text: "Get Directions",
      url: "https://maps.google.com/?q=Broadfold+Business+Centre,+Bridge+of+Don,+AB23+8EE",
    },
    category: "branch",
    location: "Broadfold Business Centre, AB23 8EE",
  },
  // Event card: Eid on the Terrace
  {
    id: "1",
    logo: "🎉",
    title: "Visit Us at Eid on the Terrace – Sunday 22nd June!",
    description:
      "We’ll be at “Eid on the Terrace,” a lively community celebration in the centre of Aberdeen!\n\nCome along and visit the iLearner's Hub stall – we’d love to see you there!",
    image: "/images/news/event1.jpg",
    actionButton: {
      text: "Get in Touch",
      url: "/register", // Replace with actual event link
    },
    category: "events",
    date: "Sunday 22nd June 2025, 11:00 AM – 5:00 PM",
    location: "Union Terrace Gardens, Aberdeen AB10 1NJ",
  },
  // Offer card: Homework Club
  {
    id: "2",
    logo: "📚",
    title: "Homework Club – Extra Support for Your Child",
    description:
      "Looking for a calm space where your child can focus and get schoolwork done—with expert support just a call away? Our Homework Club helps learners of any level complete homework, revise, and build confidence. Flexible attendance and affordable plans mean it fits right into your schedule.\n\nDon’t forget to subscribe to our News & Offers page to stay updated!",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
    actionButton: {
      text: "Find Out More",
      url: "/courses/homework-club/16",
    },
    category: "offers",
  },

  // News card: All Courses Starting August
  {
    id: "3",
    title: "ALL Courses Starting This August",
    subtitle: "ENROLMENT OPEN",
    description:
      "Whether you’re aiming to strengthen skills or take on new challenges, our courses across Primary and Secondary levels, including National 5, Highers, and Advanced Highers, have something for everyone. Don’t miss your chance to enrol and boost your confidence this school year.\n\nKeep up with all the latest — subscribe to our News & Offers page!",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    category: "news",
    actionButton: {
      text: "Explore Courses and Enroll",
      url: "/courses/all-courses",
    },
  },
];
