"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface StyleVariant {
    id: number;
    name: string;
    headingFont: string;
    bodyFont: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    ctaStyle: "solid" | "outline" | "glow" | "gradient" | "vintage";
    overlayStyle: "fade" | "slide" | "blur" | "scale" | "typewriter";
}

interface TextOverlayProps {
    text: string;
    subtext: string | null;
    startProgress: number;
    endProgress: number;
    align: "left" | "center" | "right";
    position?: "center" | "bottom";
    showCta?: boolean;
    scrollProgress: MotionValue<number>;
    variant: StyleVariant;
}

export default function TextOverlay({
    text,
    subtext,
    startProgress,
    endProgress,
    align,
    position = "center",
    showCta = false,
    scrollProgress,
    variant,
}: TextOverlayProps) {
    // Calculate fade in/out timing
    const fadeInStart = startProgress;
    const fadeInEnd = startProgress + 0.03;
    const fadeOutStart = endProgress - 0.03;
    const fadeOutEnd = endProgress;

    // Transform scroll progress to opacity
    const opacity = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    // Transform for slide effect
    const slideX = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        align === "left"
            ? [-50, 0, 0, -50]
            : align === "right"
                ? [50, 0, 0, 50]
                : [0, 0, 0, 0]
    );

    // Transform for scale effect
    const scale = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0.8, 1, 1, 0.8]
    );

    // Transform for blur effect
    const blurValue = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [10, 0, 0, 10]
    );
    const blurFilter = useTransform(blurValue, (b) => `blur(${b}px)`);

    // Get alignment classes
    const alignmentClasses = {
        left: "left-8 md:left-16 lg:left-24 text-left items-start",
        center: "left-1/2 -translate-x-1/2 text-center items-center",
        right: "right-8 md:right-16 lg:right-24 text-right items-end",
    };

    // Get style based on variant overlay style
    const getMotionStyles = (): Record<string, unknown> => {
        switch (variant.overlayStyle) {
            case "slide":
                return { opacity, x: slideX };
            case "scale":
                return { opacity, scale };
            case "blur":
                return { opacity, filter: blurFilter };
            default:
                return { opacity };
        }
    };

    // Vertical positioning
    const positionClasses = position === "bottom"
        ? "bottom-24 md:bottom-32"
        : "top-1/2 -translate-y-1/2";

    return (
        <motion.div
            className={`absolute ${positionClasses} flex flex-col ${alignmentClasses[align]} z-10 max-w-[90vw] md:max-w-lg lg:max-w-xl pointer-events-none`}
            style={getMotionStyles()}
        >
            {/* Main text */}
            <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{
                    fontFamily: variant.headingFont,
                    color: variant.textColor,
                    textShadow: "0 0 60px rgba(0, 0, 0, 0.5)",
                }}
            >
                {text}
            </h2>

            {/* Subtext */}
            {subtext && (
                <p
                    className="mt-3 text-lg md:text-2xl lg:text-3xl opacity-80 font-light"
                    style={{
                        fontFamily: variant.bodyFont,
                        color: variant.textColor,
                    }}
                >
                    {subtext}
                </p>
            )}

            {/* Decorative line */}
            <motion.div
                className="mt-4 h-[1px] w-20"
                style={{ backgroundColor: variant.accentColor, opacity }}
            />

            {/* CTA Button */}
            {showCta && (
                <motion.button
                    className="mt-8 px-8 py-4 text-sm md:text-base uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
                    style={{
                        fontFamily: variant.bodyFont,
                        backgroundColor: variant.accentColor,
                        color: variant.backgroundColor,
                        pointerEvents: "auto",
                    }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 30px ${variant.accentColor}60`,
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    See Pubs
                </motion.button>
            )}
        </motion.div>
    );
}
