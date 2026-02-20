"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuttonArmsNavbar from "@/components/SuttonArmsNavbar";
import Footer from "@/components/Footer";

const faqs = [
    { question: "What are your opening hours?", answer: "We're open Monday to Thursday 12pm–11pm, Friday & Saturday 12pm–1am, and Sunday 12pm–11pm." },
    { question: "Do you take reservations?", answer: "Yes! Call us on 01708 620410 or email gm.suttonarms@taptide.co.uk. We recommend booking for weekends and match days." },
    { question: "Is there parking available?", answer: "There is on-street parking and public car parks within a short walk on Station Lane, Hornchurch." },
    { question: "Do you cater for dietary requirements?", answer: "Absolutely! We offer vegetarian, vegan, and gluten-free options. Please inform your server of any allergies when ordering." },
    { question: "Can I book for private events?", answer: "Yes, we have space available for hire. Contact us for corporate events, birthday parties, and celebrations." },
    { question: "Do you show live sports?", answer: "We have multiple screens showing live football, rugby, golf, and more. Check our Sports page for the weekly schedule." },
];

export default function SuttonArmsContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const inputStyle = { fontFamily: "var(--font-body)", borderColor: "rgba(11, 30, 45, 0.2)", color: "var(--deep-navy)" };

    return (
        <>
            <SuttonArmsNavbar />
            <main className="min-h-screen" style={{ backgroundColor: "var(--antique-cream)" }}>
                {/* Hero Banner */}
                <section className="relative pt-32 pb-20 px-6" style={{ backgroundColor: "var(--deep-navy)" }}>
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h1 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--antique-cream)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            CONTACT US
                        </motion.h1>
                        <motion.p className="text-xl md:text-2xl opacity-70" style={{ fontFamily: "var(--font-body)", color: "var(--antique-cream)" }} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.3 }}>
                            We&apos;d love to hear from you
                        </motion.p>
                        <motion.div className="mt-6 h-[2px] w-24 mx-auto" style={{ backgroundColor: "var(--golden-bronze)" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                        {/* Info */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--deep-navy)" }}>GET IN TOUCH</h2>
                            <div className="space-y-6">
                                {[
                                    { label: "Address", content: <>14-16 Station Lane<br />Hornchurch, Greater London<br />RM12 6NJ</> },
                                    { label: "Phone", content: <a href="tel:01708620410" className="hover:opacity-70 transition-opacity" style={{ color: "var(--golden-bronze)" }}>01708 620410</a> },
                                    { label: "Email", content: <a href="mailto:gm.suttonarms@taptide.co.uk" className="hover:opacity-70 transition-opacity" style={{ color: "var(--golden-bronze)" }}>gm.suttonarms@taptide.co.uk</a> },
                                    {
                                        label: "Opening Hours", content: (
                                            <div className="space-y-1">
                                                <p>Mon – Thu: 12:00 – 23:00</p>
                                                <p>Fri – Sat: 12:00 – 01:00</p>
                                                <p>Sunday: 12:00 – 23:00</p>
                                            </div>
                                        )
                                    },
                                ].map(({ label, content }) => (
                                    <div key={label}>
                                        <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--golden-bronze)" }}>{label}</h3>
                                        <div className="text-base" style={{ fontFamily: "var(--font-body)", color: "var(--deep-navy)" }}>{content}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div className="rounded-lg p-8" style={{ backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(11, 30, 45, 0.1)" }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--deep-navy)" }}>SEND A MESSAGE</h2>
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                                        <div className="text-5xl mb-4" style={{ color: "var(--golden-bronze)" }}>✓</div>
                                        <p className="text-xl" style={{ fontFamily: "var(--font-display)", color: "var(--deep-navy)" }}>Message Sent!</p>
                                        <p className="opacity-70" style={{ fontFamily: "var(--font-body)", color: "var(--deep-navy)" }}>We&apos;ll get back to you soon.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors" style={inputStyle} />
                                            <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors" style={inputStyle} />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors" style={inputStyle} />
                                            <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors" style={inputStyle}>
                                                <option value="">Select Subject</option>
                                                <option value="reservation">Reservation</option>
                                                <option value="event">Private Event</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <textarea placeholder="Your Message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors resize-none" style={inputStyle} />
                                        <button type="submit" className="w-full py-4 text-sm uppercase tracking-[0.2em] transition-all hover:opacity-90" style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--deep-navy)", color: "var(--antique-cream)" }}>
                                            Send Message
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-16 px-6" style={{ backgroundColor: "#fff" }}>
                    <div className="max-w-3xl mx-auto">
                        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--deep-navy)" }}>FREQUENTLY ASKED QUESTIONS</h2>
                        </motion.div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div key={index} className="border rounded-lg overflow-hidden" style={{ borderColor: "rgba(11, 30, 45, 0.1)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-4 flex justify-between items-center text-left transition-colors hover:bg-gray-50">
                                        <span className="text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--deep-navy)" }}>{faq.question}</span>
                                        <motion.span animate={{ rotate: openFaq === index ? 45 : 0 }} className="text-2xl" style={{ color: "var(--golden-bronze)" }}>+</motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                <p className="px-6 pb-4" style={{ fontFamily: "var(--font-body)", color: "var(--deep-navy)", opacity: 0.8 }}>{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Map Placeholder */}
                <section className="h-64 md:h-96 flex items-center justify-center" style={{ backgroundColor: "var(--ocean-teal)" }}>
                    <p className="text-xl opacity-70" style={{ fontFamily: "var(--font-body)", color: "var(--antique-cream)" }}>[Google Maps — 14-16 Station Lane, Hornchurch]</p>
                </section>
            </main>
            <Footer />
        </>
    );
}
