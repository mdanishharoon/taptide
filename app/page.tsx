"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const variants = [
  {
    id: 1,
    name: "Classic Elegance",
    description: "Refined serif typography with golden accents",
    color: "#AC8A4D",
  },
  {
    id: 2,
    name: "Brutalist Modern",
    description: "Bold sans-serif with high contrast",
    color: "#F4F1E1",
  },
  {
    id: 3,
    name: "Coastal Minimalism",
    description: "Soft teal tones with airy spacing",
    color: "#204A5E",
  },
  {
    id: 4,
    name: "Neon Nightlife",
    description: "Glowing accents with dynamic energy",
    color: "#AC8A4D",
  },
  {
    id: 5,
    name: "Vintage Pub",
    description: "Warm nostalgic tones with texture",
    color: "#AC8A4D",
  },
];

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16"
      style={{ backgroundColor: "#0B1E2D" }}
    >
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #AC8A4D 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-16 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-6xl md:text-8xl font-bold tracking-[0.15em] mb-4"
          style={{
            fontFamily: "var(--font-schibsted)",
            color: "#F4F1E1",
          }}
        >
          TAPTIDE
        </h1>
        <p
          className="text-xl md:text-2xl tracking-[0.3em] uppercase opacity-60"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "#F4F1E1",
          }}
        >
          Crafted by the Coast
        </p>

        <motion.div
          className="mt-8 h-[1px] w-32 mx-auto"
          style={{ backgroundColor: "#AC8A4D" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-center mb-12 max-w-lg text-lg opacity-80 z-10"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "#F4F1E1",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.6 }}
      >
        Experience the perfect pour through five distinct aesthetic journeys.
        Choose your experience below.
      </motion.p>

      {/* Variant Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl w-full z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
      >
        {variants.map((variant) => (
          <motion.div
            key={variant.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link href={`/${variant.id}`}>
              <motion.div
                className="group relative p-8 rounded-sm border cursor-pointer overflow-hidden"
                style={{
                  borderColor: `${variant.color}40`,
                  backgroundColor: `#0B1E2D`,
                }}
                whileHover={{
                  borderColor: variant.color,
                  backgroundColor: `${variant.color}10`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${variant.color}20 0%, transparent 70%)`,
                  }}
                />

                {/* Number */}
                <div
                  className="text-5xl font-bold mb-4 opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    color: variant.color,
                  }}
                >
                  0{variant.id}
                </div>

                {/* Name */}
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    color: "#F4F1E1",
                  }}
                >
                  {variant.name}
                </h2>

                {/* Description */}
                <p
                  className="text-sm opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "#F4F1E1",
                  }}
                >
                  {variant.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: variant.color }}
                >
                  <span
                    className="text-sm uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-schibsted)" }}
                  >
                    Enter
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 10h10M12 6l4 4-4 4" />
                  </svg>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        className="mt-16 text-sm opacity-40 text-center z-10"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "#F4F1E1",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
      >
        Scroll to experience the perfect pour
      </motion.p>
    </main>
  );
}
