import BranchSection from "@/components/main/branches";
import CourseCategories from "@/components/main/courses";
import CTA from "@/components/main/cta";
import Featured from "@/components/main/feature";
import Hero from "@/components/main/hero";
import PrimarySection from "@/components/main/primary";
import ClientReview from "@/components/main/client-review";
import Testimonials from "@/components/main/testimonials";
import Image from "next/image";
import ContactSection from "@/components/main/contact";
import FAQSection from "@/components/main/faq/FAQ-Section";
import faqItems from "../../components/main/faq/homefaqData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iLearner's Hub - Home | Interactive Learning Platform",
  description:
    "Welcome to iLearner's Hub! Discover engaging courses from Primary to Advanced Highers. Expert tutoring, interactive lessons, and personalized learning experiences await.",
};

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-50/50 via-blue-50 to-pink-100/50">
      <Hero />
      <BranchSection />
      <Testimonials />
      <PrimarySection />
      <ClientReview />
      <CourseCategories />
      <ContactSection />
      {/* <Featured /> */}
      <CTA />
      <FAQSection faqItems={faqItems} />
    </main>
  );
}
