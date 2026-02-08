"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#sports", label: "Sports" },
    { href: "#whats-on", label: "What's On" },
    { href: "#menu", label: "Menu" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show/hide based on scroll direction
        if (latest > lastScrollY && latest > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(latest);

        // Add background blur when scrolled
        setIsScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.div
                    className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
                    style={{
                        backgroundColor: isScrolled ? "rgba(11, 30, 45, 0.85)" : "transparent",
                        backdropFilter: isScrolled ? "blur(20px)" : "none",
                        border: isScrolled ? "1px solid rgba(172, 138, 77, 0.2)" : "1px solid transparent",
                        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
                    }}
                >
                    {/* Logo */}
                    <Link href="#home" className="group">
                        <motion.span
                            className="text-2xl md:text-3xl tracking-[0.15em]"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--golden-bronze)",
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            TAPTIDE
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="group relative py-2 text-sm uppercase tracking-[0.2em] transition-colors"
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        color: "var(--antique-cream)",
                                    }}
                                >
                                    <span className="relative z-10 group-hover:text-golden-bronze transition-colors duration-300">
                                        {link.label}
                                    </span>
                                    {/* Animated underline */}
                                    <motion.span
                                        className="absolute bottom-0 left-0 h-[2px] bg-golden-bronze"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        style={{ backgroundColor: "var(--golden-bronze)" }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-antique-cream block origin-center"
                            style={{ backgroundColor: "var(--antique-cream)" }}
                            animate={{
                                rotate: isMobileOpen ? 45 : 0,
                                y: isMobileOpen ? 8 : 0,
                            }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-antique-cream block"
                            style={{ backgroundColor: "var(--antique-cream)" }}
                            animate={{
                                opacity: isMobileOpen ? 0 : 1,
                                x: isMobileOpen ? 20 : 0,
                            }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-antique-cream block origin-center"
                            style={{ backgroundColor: "var(--antique-cream)" }}
                            animate={{
                                rotate: isMobileOpen ? -45 : 0,
                                y: isMobileOpen ? -8 : 0,
                            }}
                        />
                    </motion.button>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: "rgba(11, 30, 45, 0.98)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-3xl uppercase tracking-[0.3em] transition-colors hover:text-golden-bronze"
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            color: "var(--antique-cream)",
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
