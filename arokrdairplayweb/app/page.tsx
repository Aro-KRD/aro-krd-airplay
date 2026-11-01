import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AppPreview from "@/components/AppPreview";
import Features from "@/components/Features";
import ArchGuide from "@/components/ArchGuide";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <AppPreview />
      <Features />
      <ArchGuide />
      <Faq />
      <Footer />
    </main>
  );
}
