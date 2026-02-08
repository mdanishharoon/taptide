"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeerScroll from "@/components/BeerScroll";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BeerScroll />
      </main>
      <Footer />
    </>
  );
}
