"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    // Text animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 100, rotateX: 90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        },
    };

    const lineVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 1.2,
                delay: 1,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            },
        },
    };

    const title = "TAPTIDE";

    return (
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
                animate={{
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
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
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.2, 0.5, 0.2],
                        }}
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
                {/* Main Title */}
                <motion.div
                    className="perspective-1000"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex overflow-hidden">
                        {title.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                variants={letterVariants}
                                className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] tracking-[0.1em] inline-block"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--antique-cream)",
                                    textShadow: "0 0 80px rgba(172, 138, 77, 0.3)",
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Animated Line */}
                <motion.div
                    className="h-[2px] w-48 md:w-64 my-8 origin-center"
                    style={{ backgroundColor: "var(--golden-bronze)" }}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
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
                    Crafted to Perfection
                </motion.p>
            </motion.div>

            {/* Corner Accents */}
            <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2"
                style={{ borderColor: "rgba(172, 138, 77, 0.3)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
            />
            <motion.div
                className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2"
                style={{ borderColor: "rgba(172, 138, 77, 0.3)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1, duration: 0.6 }}
            />
            <motion.div
                className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2"
                style={{ borderColor: "rgba(172, 138, 77, 0.3)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
            />
            <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2"
                style={{ borderColor: "rgba(172, 138, 77, 0.3)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, duration: 0.6 }}
            />
        </section>
    );
}
