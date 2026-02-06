"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import type { StyleVariant } from "./BeerScroll";

interface TextOverlayProps {
    text: string;
    subtext: string | null;
    startProgress: number;
    endProgress: number;
    align: "left" | "center" | "right";
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

    // Transform for slide effect (variant 2)
    const slideX = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        align === "left"
            ? [-50, 0, 0, -50]
            : align === "right"
                ? [50, 0, 0, 50]
                : [0, 0, 0, 0]
    );

    // Transform for scale effect (variant 4)
    const scale = useTransform(
        scrollProgress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0.8, 1, 1, 0.8]
    );

    // Transform for blur effect (variant 3) - must be at top level
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
    const getMotionStyles = (): Record<string, any> => {
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

    // CTA button styles based on variant
    const getCtaStyles = () => {
        const baseStyles =
            "mt-8 px-8 py-4 text-sm md:text-base uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer";

        switch (variant.ctaStyle) {
            case "solid":
                return `${baseStyles} bg-[${variant.accentColor}] text-[${variant.backgroundColor}] hover:opacity-90`;
            case "outline":
                return `${baseStyles} border-2 border-current bg-transparent hover:bg-[${variant.textColor}] hover:text-[${variant.backgroundColor}]`;
            case "glow":
                return `${baseStyles} bg-transparent border border-[${variant.accentColor}]`;
            case "gradient":
                return `${baseStyles} bg-gradient-to-r from-[#204A5E] to-[#AC8A4D] text-white`;
            case "vintage":
                return `${baseStyles} border border-[${variant.accentColor}] bg-transparent relative overflow-hidden`;
            default:
                return baseStyles;
        }
    };

    return (
        <motion.div
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col ${alignmentClasses[align]} z-10 max-w-[90vw] md:max-w-lg lg:max-w-xl pointer-events-none`}
            style={getMotionStyles()}
        >
            {/* Main text */}
            <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{
                    fontFamily: variant.headingFont,
                    color: variant.textColor,
                }}
            >
                {variant.overlayStyle === "typewriter" ? (
                    <TypewriterText text={text} />
                ) : (
                    text
                )}
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
                    {variant.overlayStyle === "typewriter" ? (
                        <TypewriterText text={subtext} delay={0.5} />
                    ) : (
                        subtext
                    )}
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
                    className={getCtaStyles()}
                    style={{
                        fontFamily: variant.bodyFont,
                        backgroundColor:
                            variant.ctaStyle === "solid" ? variant.accentColor : undefined,
                        color:
                            variant.ctaStyle === "solid"
                                ? variant.backgroundColor
                                : variant.textColor,
                        borderColor:
                            variant.ctaStyle !== "gradient" ? variant.accentColor : undefined,
                        boxShadow:
                            variant.ctaStyle === "glow"
                                ? `0 0 20px ${variant.accentColor}40, inset 0 0 20px ${variant.accentColor}10`
                                : undefined,
                        pointerEvents: "auto",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Book a Table
                </motion.button>
            )}
        </motion.div>
    );
}

// Typewriter effect component for vintage variant
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <motion.span>
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.05,
                        delay: delay + index * 0.05,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}
