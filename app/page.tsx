"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeerScroll from "@/components/BeerScroll";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BeerScroll />
      </main>
    </>
  );
}
