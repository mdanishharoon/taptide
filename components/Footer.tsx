"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="relative py-16 md:py-24 px-6 overflow-hidden"
            style={{ backgroundColor: "var(--antique-cream)" }}
        >
            {/* Decorative dots and line */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--golden-bronze)" }}
                    />
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--ocean-teal)" }}
                    />
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--deep-navy)" }}
                    />
                    <motion.div
                        className="flex-1 h-[1px] ml-2"
                        style={{ backgroundColor: "rgba(11, 30, 45, 0.15)" }}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>

                {/* Main content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Large Logo */}
                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/">
                            <h2
                                className="text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                TAPTIDE
                            </h2>
                        </Link>
                    </motion.div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 flex-1">
                        {/* Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <h3
                                className="text-sm uppercase tracking-[0.2em] mb-4"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--golden-bronze)",
                                }}
                            >
                                Address
                            </h3>
                            <p
                                className="text-base leading-relaxed"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                14-16 Station Lane,<br />
                                Hornchurch, Greater London,<br />
                                RM12 6NJ
                            </p>
                        </motion.div>

                        {/* Book a Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h3
                                className="text-sm uppercase tracking-[0.2em] mb-4"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--golden-bronze)",
                                }}
                            >
                                Book A Table
                            </h3>
                            <p
                                className="text-base leading-relaxed mb-4"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                Book a table for drinks,<br />
                                food, sports
                            </p>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-all"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--golden-bronze)",
                                }}
                            >
                                <span className="group-hover:translate-x-1 transition-transform">
                                    Click Here
                                </span>
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </Link>
                        </motion.div>

                        {/* Opening Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h3
                                className="text-sm uppercase tracking-[0.2em] mb-4"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--golden-bronze)",
                                }}
                            >
                                Opening Hours
                            </h3>
                            <div
                                className="text-base leading-relaxed space-y-1"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                <p>Sun - Thu: 9:00 AM - 11:00 PM</p>
                                <p>Friday: 9:00 AM - 1:00 AM</p>
                                <p>Saturday: 9:00 AM - 3:00 AM</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
                    style={{ borderColor: "rgba(11, 30, 45, 0.1)" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <p
                        className="text-xs uppercase tracking-[0.15em] opacity-60"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--deep-navy)",
                        }}
                    >
                        © 2026 Taptide. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="text-xs uppercase tracking-[0.15em] transition-colors hover:opacity-100 opacity-60"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--deep-navy)",
                            }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs uppercase tracking-[0.15em] transition-colors hover:opacity-100 opacity-60"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--deep-navy)",
                            }}
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
