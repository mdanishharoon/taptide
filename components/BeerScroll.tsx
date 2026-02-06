"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from "framer-motion";
import TextOverlay from "./TextOverlay";

const TOTAL_FRAMES = 120;
const FRAME_PATH = "/sequenced/ezgif-frame-";

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

const variants: Record<number, StyleVariant> = {
    1: {
        id: 1,
        name: "Classic Elegance",
        headingFont: "var(--font-cormorant)",
        bodyFont: "var(--font-cormorant)",
        accentColor: "#AC8A4D",
        backgroundColor: "#0B1E2D",
        textColor: "#F4F1E1",
        ctaStyle: "solid",
        overlayStyle: "fade",
    },
    2: {
        id: 2,
        name: "Brutalist Modern",
        headingFont: "var(--font-schibsted)",
        bodyFont: "var(--font-schibsted)",
        accentColor: "#F4F1E1",
        backgroundColor: "#0B1E2D",
        textColor: "#F4F1E1",
        ctaStyle: "outline",
        overlayStyle: "slide",
    },
    3: {
        id: 3,
        name: "Coastal Minimalism",
        headingFont: "var(--font-cormorant)",
        bodyFont: "var(--font-schibsted)",
        accentColor: "#204A5E",
        backgroundColor: "#0B1E2D",
        textColor: "#F4F1E1",
        ctaStyle: "gradient",
        overlayStyle: "blur",
    },
    4: {
        id: 4,
        name: "Neon Nightlife",
        headingFont: "var(--font-schibsted)",
        bodyFont: "var(--font-schibsted)",
        accentColor: "#AC8A4D",
        backgroundColor: "#0B1E2D",
        textColor: "#AC8A4D",
        ctaStyle: "glow",
        overlayStyle: "scale",
    },
    5: {
        id: 5,
        name: "Vintage Pub",
        headingFont: "var(--font-cormorant)",
        bodyFont: "var(--font-cormorant)",
        accentColor: "#AC8A4D",
        backgroundColor: "#0B1E2D",
        textColor: "#F4F1E1",
        ctaStyle: "vintage",
        overlayStyle: "typewriter",
    },
};

interface BeerScrollProps {
    variantId: number;
}

export default function BeerScroll({ variantId }: BeerScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
    const [currentFrame, setCurrentFrame] = useState(1);

    const variant = variants[variantId] || variants[1];

    // Handle canvas resize
    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Preload all images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const preloadImage = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                const paddedIndex = String(index).padStart(3, "0");
                img.src = `${FRAME_PATH}${paddedIndex}.jpg`;
                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                    resolve(img);
                };
                img.onerror = reject;
            });
        };

        const loadAllImages = async () => {
            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
                preloadImage(i + 1)
            );
            const results = await Promise.all(promises);
            loadedImages.push(...results);
            setImages(loadedImages);
            setImagesLoaded(true);
        };

        loadAllImages();
    }, []);

    // Scroll progress tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out scroll with spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    // Map scroll progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Render frame to canvas
    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas || !imagesLoaded || images.length === 0) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Get image for current frame
            const imgIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(index)));
            const img = images[imgIndex];

            if (img) {
                // Crop bottom 5% of source image
                const cropPercentage = 0.95; // Use top 95% of image
                const croppedImgHeight = img.height * cropPercentage;

                // Calculate object-cover dimensions (fills width, crops height)
                const imgAspect = img.width / croppedImgHeight;
                const canvasAspect = canvas.width / canvas.height;

                let drawWidth, drawHeight, drawX, drawY;

                if (imgAspect > canvasAspect) {
                    // Image is wider - fit to height (fill vertically)
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    drawX = (canvas.width - drawWidth) / 2;
                    drawY = 0;
                } else {
                    // Image is taller - fit to width (fill horizontally)
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    drawX = 0;
                    drawY = (canvas.height - drawHeight) / 2;
                }

                // Draw with cropped source (sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                ctx.drawImage(
                    img,
                    0, 0, img.width, croppedImgHeight, // Source: full width, cropped height
                    drawX, drawY, drawWidth, drawHeight // Destination: cover canvas
                );
            }
        },
        [images, imagesLoaded]
    );

    // Render loop based on frame index changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const newFrame = Math.round(latest) + 1;
        setCurrentFrame(newFrame);
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Initial render when images load or canvas size changes
    useEffect(() => {
        if (imagesLoaded) {
            const currentFrameIndex = frameIndex.get();
            renderFrame(currentFrameIndex);
        }
    }, [imagesLoaded, canvasSize, renderFrame, frameIndex]);

    // Text overlay content
    const textContent = useMemo(
        () => [
            {
                text: "TAPTIDE.",
                subtext: "Crafted by the Coast.",
                startProgress: 0,
                endProgress: 0.15,
                align: "center" as const,
            },
            {
                text: "The perfect pour",
                subtext: "begins with precision.",
                startProgress: 0.25,
                endProgress: 0.4,
                align: "left" as const,
            },
            {
                text: "Cold, crisp,",
                subtext: "and captured in amber.",
                startProgress: 0.5,
                endProgress: 0.65,
                align: "right" as const,
            },
            {
                text: "Your table is waiting.",
                subtext: null,
                startProgress: 0.8,
                endProgress: 1,
                align: "center" as const,
                showCta: true,
            },
        ],
        []
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: "600vh", backgroundColor: variant.backgroundColor }}
        >
            {/* Loading Screen - Fixed Overlay */}
            {!imagesLoaded && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: variant.backgroundColor }}
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

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-[0.2em] mb-16"
                        style={{
                            fontFamily: variant.headingFont,
                            color: variant.textColor,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        TAPTIDE
                    </motion.h1>

                    <div className="relative w-64 md:w-80">
                        <div
                            className="h-[2px] w-full rounded-full overflow-hidden"
                            style={{ backgroundColor: `${variant.textColor}20` }}
                        >
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: variant.accentColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        <motion.div className="mt-6 text-center">
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
                                {loadProgress}%
                            </span>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <canvas
                    ref={canvasRef}
                    className="block"
                    width={canvasSize.width}
                    height={canvasSize.height}
                    style={{ backgroundColor: variant.backgroundColor }}
                />
            </div>

            {/* Text Overlays - Fixed Layer */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
                {textContent.map((content, index) => (
                    <TextOverlay
                        key={index}
                        text={content.text}
                        subtext={content.subtext}
                        startProgress={content.startProgress}
                        endProgress={content.endProgress}
                        align={content.align}
                        showCta={content.showCta}
                        scrollProgress={smoothProgress}
                        variant={variant}
                    />
                ))}

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: currentFrame < 10 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span
                        className="text-sm uppercase tracking-[0.3em] opacity-60"
                        style={{ fontFamily: variant.bodyFont, color: variant.textColor }}
                    >
                        Scroll to pour
                    </span>
                    <motion.div
                        className="w-px h-12"
                        style={{ backgroundColor: variant.accentColor }}
                        animate={{ scaleY: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export { variants };
export type { StyleVariant };
