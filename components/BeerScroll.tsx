"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from "framer-motion";
import TextOverlay from "./TextOverlay";

const TOTAL_FRAMES = 110;
const FRAME_PATH = "/sequenced/ezgif-frame-";

// Single style configuration
const style = {
    headingFont: "var(--font-display)",
    bodyFont: "var(--font-body)",
    accentColor: "#AC8A4D",
    backgroundColor: "#0B1E2D",
    textColor: "#F4F1E1",
    ctaStyle: "solid" as const,
    overlayStyle: "fade" as const,
};

export default function BeerScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
    const [currentFrame, setCurrentFrame] = useState(1);

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

    // Smooth out scroll with spring physics (enhanced momentum)
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.5,
        stiffness: 50,
        damping: 15,
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
                const cropPercentage = 0.95;
                const croppedImgHeight = img.height * cropPercentage;

                const imgAspect = img.width / croppedImgHeight;
                const canvasAspect = canvas.width / canvas.height;

                let drawWidth, drawHeight, drawX, drawY;

                if (imgAspect > canvasAspect) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    drawX = (canvas.width - drawWidth) / 2;
                    drawY = 0;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    drawX = 0;
                    drawY = (canvas.height - drawHeight) / 2;
                }

                ctx.drawImage(
                    img,
                    0, 0, img.width, croppedImgHeight,
                    drawX, drawY, drawWidth, drawHeight
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
                text: "The Perfect Pour",
                subtext: "begins with precision.",
                startProgress: 0.05,
                endProgress: 0.25,
                align: "left" as const,
            },
            {
                text: "Cold, crisp,",
                subtext: "and captured in amber.",
                startProgress: 0.35,
                endProgress: 0.55,
                align: "right" as const,
            },
            {
                text: "Every glass",
                subtext: "tells a story.",
                startProgress: 0.65,
                endProgress: 0.85,
                align: "left" as const,
            },
            {
                text: "Your table awaits.",
                subtext: null,
                startProgress: 0.85,
                endProgress: 1.1,
                align: "center" as const,
                showCta: true,
                position: "bottom" as const,
            },
        ],
        []
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full"
            style={{
                height: "500vh",
                backgroundColor: style.backgroundColor,
            }}
        >
            {/* Loading Screen - Fixed Overlay */}
            {!imagesLoaded && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: style.backgroundColor }}
                >
                    {/* Animated background texture */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, ${style.accentColor}22 1px, transparent 0)`,
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-[0.2em] mb-16"
                        style={{
                            fontFamily: style.headingFont,
                            color: style.textColor,
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
                            style={{ backgroundColor: `${style.textColor}20` }}
                        >
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: style.accentColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        <motion.div className="mt-6 text-center">
                            <span
                                className="text-sm uppercase tracking-[0.3em]"
                                style={{
                                    fontFamily: style.bodyFont,
                                    color: `${style.textColor}80`,
                                }}
                            >
                                Pouring perfection
                            </span>
                            <span
                                className="ml-4 text-sm tabular-nums"
                                style={{
                                    fontFamily: style.bodyFont,
                                    color: style.accentColor,
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
                    style={{ backgroundColor: style.backgroundColor }}
                />
            </div>

            {/* Text Overlays - Sticky Layer (stops at section end) */}
            <div className="sticky top-0 h-screen w-full pointer-events-none z-10" style={{ marginTop: "-100vh" }}>
                {textContent.map((content, index) => (
                    <TextOverlay
                        key={index}
                        text={content.text}
                        subtext={content.subtext}
                        startProgress={content.startProgress}
                        endProgress={content.endProgress}
                        align={content.align}
                        position={content.position}
                        showCta={content.showCta}
                        scrollProgress={smoothProgress}
                        variant={{
                            id: 1,
                            name: "Default",
                            ...style,
                        }}
                    />
                ))}

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                        opacity: currentFrame < 10 ? 1 : 0,
                        scale: currentFrame > 5 ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <span
                        className="text-sm uppercase tracking-[0.3em] opacity-60"
                        style={{ fontFamily: style.bodyFont, color: style.textColor }}
                    >
                        Scroll to pour
                    </span>
                    <motion.div
                        className="w-px h-12"
                        style={{ backgroundColor: style.accentColor }}
                        animate={{ scaleY: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
