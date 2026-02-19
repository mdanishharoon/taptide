"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample sports schedule data
const sportsSchedule = [
    {
        date: "Saturday, Feb 8",
        events: [
            { time: "12:30", sport: "Premier League", match: "Liverpool vs Manchester City", channel: "Sky Sports" },
            { time: "15:00", sport: "Six Nations", match: "England vs Wales", channel: "BBC" },
            { time: "17:30", sport: "Premier League", match: "Arsenal vs Tottenham", channel: "Sky Sports" },
        ],
    },
    {
        date: "Sunday, Feb 9",
        events: [
            { time: "14:00", sport: "Premier League", match: "Chelsea vs Manchester United", channel: "Sky Sports" },
            { time: "16:00", sport: "NFL", match: "Super Bowl LVIII", channel: "Sky Sports NFL" },
        ],
    },
    {
        date: "Monday, Feb 10",
        events: [
            { time: "20:00", sport: "Premier League", match: "Newcastle vs Brighton", channel: "Sky Sports" },
        ],
    },
    {
        date: "Tuesday, Feb 11",
        events: [
            { time: "20:00", sport: "Champions League", match: "Real Madrid vs Bayern Munich", channel: "TNT Sports" },
            { time: "20:00", sport: "Champions League", match: "PSG vs Barcelona", channel: "TNT Sports" },
        ],
    },
];

export default function SportsPage() {
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
                            LIVE SPORTS
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
                            Catch all the action on our big screens
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

                {/* Schedule Section */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
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
                                THIS WEEK&apos;S FIXTURES
                            </h2>
                            <p
                                className="text-lg opacity-70"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                Book your table to guarantee the best seats
                            </p>
                        </motion.div>

                        {/* Schedule Cards */}
                        <div className="space-y-8">
                            {sportsSchedule.map((day, dayIndex) => (
                                <motion.div
                                    key={day.date}
                                    className="rounded-lg overflow-hidden"
                                    style={{
                                        backgroundColor: "#fff",
                                        boxShadow: "0 4px 20px rgba(11, 30, 45, 0.1)",
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: dayIndex * 0.1 }}
                                >
                                    {/* Day Header */}
                                    <div
                                        className="px-6 py-4"
                                        style={{ backgroundColor: "var(--deep-navy)" }}
                                    >
                                        <h3
                                            className="text-xl"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                color: "var(--golden-bronze)",
                                            }}
                                        >
                                            {day.date}
                                        </h3>
                                    </div>

                                    {/* Events */}
                                    <div className="divide-y" style={{ borderColor: "rgba(11, 30, 45, 0.1)" }}>
                                        {day.events.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span
                                                        className="text-2xl font-bold"
                                                        style={{
                                                            fontFamily: "var(--font-display)",
                                                            color: "var(--golden-bronze)",
                                                        }}
                                                    >
                                                        {event.time}
                                                    </span>
                                                    <div>
                                                        <p
                                                            className="text-sm uppercase tracking-wider opacity-60"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            {event.sport}
                                                        </p>
                                                        <p
                                                            className="text-lg font-semibold"
                                                            style={{
                                                                fontFamily: "var(--font-body)",
                                                                color: "var(--deep-navy)",
                                                            }}
                                                        >
                                                            {event.match}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm"
                                                    style={{
                                                        backgroundColor: "var(--ocean-teal)",
                                                        color: "var(--antique-cream)",
                                                        fontFamily: "var(--font-body)",
                                                    }}
                                                >
                                                    {event.channel}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <p
                                className="text-lg mb-6 opacity-70"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                Don&apos;t miss a moment of the action!
                            </p>
                            <button
                                className="px-8 py-4 text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    backgroundColor: "var(--golden-bronze)",
                                    color: "var(--deep-navy)",
                                }}
                            >
                                Book a Table
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* FANZO Widget Section */}
                <section className="py-16 px-6" style={{ backgroundColor: "#fff" }}>
                    <div className="max-w-4xl mx-auto">
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
                                LIVE FIXTURES
                            </h2>
                        </motion.div>

                        {/* FANZO Widget */}
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div id="FANZO-widget-container" style={{ maxWidth: '100%', margin: '0 auto' }} />
                            <Script
                                src="https://widget.fanzo.com/widget.js"
                                strategy="lazyOnload"
                                onLoad={() => {
                                    if (typeof window !== 'undefined') {
                                        const win = window as Window & { FANZOWidget?: (config: { container: string }) => void };
                                        if (win.FANZOWidget) {
                                            win.FANZOWidget({
                                                container: 'FANZO-widget-container'
                                            });
                                        }
                                    }
                                }}
                            />
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
