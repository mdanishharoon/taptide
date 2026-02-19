"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const pubs = [
    {
        name: "Sutton Arms",
        address: "14-16 Station Lane, Hornchurch, Greater London, RM12 6NJ",
        email: "gm.suttonarms@taptide.co.uk",
        phone: "01708 620410",
        hours: [
            { days: "Monday - Wednesday", time: "12:00 PM – 11:00 PM" },
            { days: "Thursday", time: "12:00 PM – 11:00 PM" },
            { days: "Friday", time: "12:00 PM – 01:00 AM" },
            { days: "Saturday", time: "11:00 AM – 01:00 AM" },
            { days: "Sunday", time: "12:00 PM – 11:00 PM" },
        ],
    },
];

export default function OurPubsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen" style={{ backgroundColor: "var(--antique-cream)" }}>
                {/* Hero Banner */}
                <section
                    className="relative pt-32 pb-20 px-6"
                    style={{ backgroundColor: "var(--deep-navy)" }}
                >
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h1
                            className="text-5xl md:text-7xl mb-4"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--antique-cream)",
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            OUR PUBS
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl opacity-70"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--antique-cream)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 0.3 }}
                        >
                            Visit our locations across the UK
                        </motion.p>
                        <motion.div
                            className="mt-6 h-[2px] w-24 mx-auto"
                            style={{ backgroundColor: "var(--golden-bronze)" }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </div>
                </section>

                {/* Pubs Section */}
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-1 gap-8">
                            {pubs.map((pub, index) => (
                                <motion.div
                                    key={pub.name}
                                    className="rounded-lg overflow-hidden"
                                    style={{
                                        backgroundColor: "#fff",
                                        boxShadow: "0 4px 20px rgba(11, 30, 45, 0.1)",
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                >
                                    {/* Pub Header */}
                                    <div
                                        className="px-8 py-6"
                                        style={{ backgroundColor: "var(--deep-navy)" }}
                                    >
                                        <h2
                                            className="text-3xl md:text-4xl mb-2"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                color: "var(--golden-bronze)",
                                            }}
                                        >
                                            {pub.name}
                                        </h2>
                                    </div>

                                    {/* Pub Details */}
                                    <div className="p-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Contact Info */}
                                            <div>
                                                <h3
                                                    className="text-lg mb-4 uppercase tracking-wider"
                                                    style={{
                                                        fontFamily: "var(--font-body)",
                                                        color: "var(--golden-bronze)",
                                                    }}
                                                >
                                                    Contact Information
                                                </h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p
                                                            className="text-sm uppercase tracking-wider opacity-60 mb-1"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            Address
                                                        </p>
                                                        <p
                                                            className="text-base"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            {pub.address}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            className="text-sm uppercase tracking-wider opacity-60 mb-1"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            Email
                                                        </p>
                                                        <a
                                                            href={`mailto:${pub.email}`}
                                                            className="text-base transition-colors hover:opacity-70"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--golden-bronze)",
                                                            }}
                                                        >
                                                            {pub.email}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <p
                                                            className="text-sm uppercase tracking-wider opacity-60 mb-1"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            Phone
                                                        </p>
                                                        <a
                                                            href={`tel:${pub.phone}`}
                                                            className="text-base transition-colors hover:opacity-70"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            {pub.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Opening Hours */}
                                            <div>
                                                <h3
                                                    className="text-lg mb-4 uppercase tracking-wider"
                                                    style={{
                                                        fontFamily: "var(--font-body)",
                                                        color: "var(--golden-bronze)",
                                                    }}
                                                >
                                                    Opening Hours
                                                </h3>
                                                <div className="space-y-2">
                                                    {pub.hours.map((schedule, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex justify-between border-b pb-2"
                                                            style={{ borderColor: "rgba(11, 30, 45, 0.1)" }}
                                                        >
                                                            <span
                                                                className="text-base font-medium"
                                                                style={{
                                                                    fontFamily: "var(--font-body)",
                                                                    color: "var(--deep-navy)",
                                                                }}
                                                            >
                                                                {schedule.days}
                                                            </span>
                                                            <span
                                                                className="text-base"
                                                                style={{
                                                                    fontFamily: "var(--font-body)",
                                                                    color: "var(--deep-navy)",
                                                                    opacity: 0.7,
                                                                }}
                                                            >
                                                                {schedule.time}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visit Button */}
                                        <div className="mt-8">
                                            <Link
                                                href="/contact"
                                                className="inline-block px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90"
                                                style={{
                                                    fontFamily: "var(--font-body)",
                                                    backgroundColor: "var(--golden-bronze)",
                                                    color: "var(--deep-navy)",
                                                }}
                                            >
                                                Contact Us
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Coming Soon Message */}
                        <motion.div
                            className="mt-16 text-center p-12 rounded-lg"
                            style={{
                                backgroundColor: "var(--deep-navy)",
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h3
                                className="text-2xl md:text-3xl mb-4"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--golden-bronze)",
                                }}
                            >
                                MORE LOCATIONS COMING SOON
                            </h3>
                            <p
                                className="text-lg opacity-70"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--antique-cream)",
                                }}
                            >
                                We're expanding across the UK. Stay tuned for updates.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
