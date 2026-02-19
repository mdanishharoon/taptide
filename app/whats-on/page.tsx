"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const upcomingEvents = [
    {
        title: "Quiz Night",
        date: "Every Thursday",
        time: "8:00 PM",
        description: "Test your knowledge and win prizes!",
    },
    {
        title: "Sunday Roast",
        date: "Every Sunday",
        time: "12:00 PM - 5:00 PM",
        description: "Traditional roasts with all the trimmings",
    },
    {
        title: "Live DJ",
        date: "Friday & Saturday",
        time: "9:00 PM",
        description: "Dance the night away with our resident DJs",
    },
];

export default function WhatsOnPage() {
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
                            WHAT'S ON
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
                            Events, entertainment & more at Taptide
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

                {/* Events Section */}
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-3xl md:text-4xl mb-4"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                REGULAR EVENTS
                            </h2>
                        </motion.div>

                        {/* Events Grid */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.title}
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
                                    <div
                                        className="h-40 flex items-center justify-center"
                                        style={{ backgroundColor: "var(--ocean-teal)" }}
                                    >
                                        <span
                                            className="text-6xl"
                                            style={{ color: "var(--antique-cream)", opacity: 0.3 }}
                                        >
                                            {event.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <h3
                                            className="text-xl mb-2"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                color: "var(--deep-navy)",
                                            }}
                                        >
                                            {event.title}
                                        </h3>
                                        <p
                                            className="text-sm mb-1"
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                color: "var(--golden-bronze)",
                                            }}
                                        >
                                            {event.date} • {event.time}
                                        </p>
                                        <p
                                            className="text-base opacity-70"
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                color: "var(--deep-navy)",
                                            }}
                                        >
                                            {event.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Coming Soon */}
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
                                MORE EVENTS COMING SOON
                            </h3>
                            <p
                                className="text-lg opacity-70 mb-6"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--antique-cream)",
                                }}
                            >
                                Follow us on social media for announcements
                            </p>
                            <div className="flex justify-center gap-4">
                                {["Instagram", "Facebook", "Twitter"].map((social) => (
                                    <button
                                        key={social}
                                        className="px-6 py-2 border rounded-full text-sm uppercase tracking-wider transition-colors hover:bg-white/10"
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            borderColor: "var(--golden-bronze)",
                                            color: "var(--antique-cream)",
                                        }}
                                    >
                                        {social}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
