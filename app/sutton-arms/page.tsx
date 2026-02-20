"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SuttonArmsNavbar from "@/components/SuttonArmsNavbar";
import BeerScroll from "@/components/BeerScroll";
import Footer from "@/components/Footer";

export default function SuttonArmsHome() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <>
            <SuttonArmsNavbar />
            <main>
                {/* Hero */}
                <section
                    ref={containerRef}
                    id="home"
                    className="relative h-screen w-full overflow-hidden"
                    style={{ backgroundColor: "var(--deep-navy)" }}
                >
                    {/* Animated Background Gradient */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(172, 138, 77, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 100%, rgba(32, 74, 94, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 20% 80%, rgba(172, 138, 77, 0.1) 0%, transparent 50%)
              `,
                        }}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                    backgroundColor: "var(--golden-bronze)",
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    opacity: 0.3,
                                }}
                                animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Subtle Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(172, 138, 77, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(172, 138, 77, 0.5) 1px, transparent 1px)
              `,
                            backgroundSize: "100px 100px",
                        }}
                    />

                    {/* Main Content */}
                    <motion.div
                        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
                        style={{ y, opacity, scale }}
                    >
                        {/* Sutton Arms Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <Image
                                src="/sutton-arms.png"
                                alt="Sutton Arms — Taptide Hornchurch"
                                width={320}
                                height={320}
                                className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain"
                                style={{ filter: "drop-shadow(0 0 60px rgba(172, 138, 77, 0.4))" }}
                                priority
                            />
                        </motion.div>

                        {/* Animated Line */}
                        <motion.div
                            className="h-[2px] w-48 md:w-64 my-8 origin-center"
                            style={{ backgroundColor: "var(--golden-bronze)" }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />

                        {/* Tagline */}
                        <motion.p
                            className="text-xl md:text-2xl lg:text-3xl tracking-[0.4em] uppercase"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--antique-cream)",
                                opacity: 0.7,
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            Your Local in Hornchurch
                        </motion.p>

                        {/* Quick Info Strip */}
                        <motion.div
                            className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 0.8 }}
                        >
                            {[
                                { label: "Address", value: "14-16 Station Lane, Hornchurch" },
                                { label: "Phone", value: "01708 620410" },
                                { label: "Hours", value: "Mon–Thu 12–11pm · Fri–Sat 12–1am" },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col gap-1">
                                    <span
                                        className="text-xs uppercase tracking-[0.2em] opacity-50"
                                        style={{ fontFamily: "var(--font-body)", color: "var(--golden-bronze)" }}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className="text-sm"
                                        style={{ fontFamily: "var(--font-body)", color: "var(--antique-cream)" }}
                                    >
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Corner Accents */}
                    {[
                        "absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2",
                        "absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2",
                        "absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2",
                        "absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2",
                    ].map((cls, i) => (
                        <motion.div
                            key={i}
                            className={cls}
                            style={{ borderColor: "rgba(172, 138, 77, 0.3)" }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2 + i * 0.1, duration: 0.6 }}
                        />
                    ))}
                </section>

                <BeerScroll />
            </main>
            <Footer />
        </>
    );
}
