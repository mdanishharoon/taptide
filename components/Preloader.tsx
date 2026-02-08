"use client";

import { motion } from "framer-motion";

interface StyleVariant {
    id: number;
    name: string;
    headingFont: string;
    bodyFont: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    ctaStyle: "solid" | "outline";
    overlayStyle: "fade" | "slide" | "blur";
}

interface PreloaderProps {
    progress: number;
    variant: StyleVariant;
}

export default function Preloader({ progress, variant }: PreloaderProps) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: variant.backgroundColor }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Animated background texture */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${variant.accentColor}22 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Logo text */}
            <motion.div
                className="relative mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1
                    className="text-5xl md:text-7xl font-bold tracking-[0.2em]"
                    style={{
                        fontFamily: variant.headingFont,
                        color: variant.textColor,
                    }}
                >
                    TAPTIDE
                </h1>
                <motion.div
                    className="absolute -bottom-2 left-0 h-[2px]"
                    style={{ backgroundColor: variant.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </motion.div>

            {/* Progress bar container */}
            <div className="relative w-64 md:w-80">
                {/* Background track */}
                <div
                    className="h-[2px] w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: `${variant.textColor}20` }}
                >
                    {/* Progress fill */}
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: variant.accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>

                {/* Progress text */}
                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span
                        className="text-sm uppercase tracking-[0.3em]"
                        style={{
                            fontFamily: variant.bodyFont,
                            color: `${variant.textColor}80`,
                        }}
                    >
                        Pouring perfection
                    </span>
                    <span
                        className="ml-4 text-sm tabular-nums"
                        style={{
                            fontFamily: variant.bodyFont,
                            color: variant.accentColor,
                        }}
                    >
                        {Math.round(progress)}%
                    </span>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
            >
                <svg
                    width="24"
                    height="40"
                    viewBox="0 0 24 40"
                    fill="none"
                    style={{ color: variant.accentColor }}
                >
                    <rect x="11" y="0" width="2" height="25" fill="currentColor" />
                    <motion.circle
                        cx="12"
                        cy="35"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
}
