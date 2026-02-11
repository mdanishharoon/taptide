"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const menuCategories = [
    {
        name: "Breakfast",
        description: "Served until 11:30am",
        items: [
            { name: "Full English", price: "12.95", description: "Bacon, sausages, eggs, beans, mushrooms, tomatoes & toast" },
            { name: "Eggs Benedict", price: "10.95", description: "Poached eggs, ham, hollandaise on toasted muffin" },
            { name: "Avocado Toast", price: "9.50", description: "Smashed avocado, poached eggs, chilli flakes" },
            { name: "Pancake Stack", price: "8.95", description: "Fluffy pancakes with maple syrup & bacon" },
        ],
    },
    {
        name: "Lunch",
        description: "Served 11:30am - 5pm",
        items: [
            { name: "Fish & Chips", price: "14.95", description: "Beer battered cod, chunky chips, mushy peas, tartare sauce" },
            { name: "Club Sandwich", price: "11.95", description: "Triple deck with chicken, bacon, lettuce, tomato" },
            { name: "Soup of the Day", price: "6.50", description: "Served with crusty bread & butter" },
            { name: "Caesar Salad", price: "10.95", description: "Romaine, parmesan, croutons, anchovy dressing" },
        ],
    },
    {
        name: "Mains",
        description: "Served all day",
        items: [
            { name: "8oz Ribeye Steak", price: "24.95", description: "Chips, grilled tomato, mushrooms, peppercorn sauce" },
            { name: "Beef Burger", price: "15.95", description: "6oz patty, bacon, cheese, brioche bun, fries" },
            { name: "Pie of the Day", price: "13.95", description: "Handmade pie with mash & seasonal vegetables" },
            { name: "Grilled Salmon", price: "18.95", description: "With new potatoes, tenderstem broccoli, lemon butter" },
            { name: "Chicken Parmo", price: "14.95", description: "Breaded chicken, béchamel, cheese, chips & salad" },
        ],
    },
    {
        name: "Kids",
        description: "Under 12s",
        items: [
            { name: "Mini Fish & Chips", price: "7.95", description: "Battered fish goujons with chips & peas" },
            { name: "Chicken Nuggets", price: "6.95", description: "With chips & beans" },
            { name: "Pasta Bolognese", price: "6.95", description: "Beef ragu with penne pasta" },
            { name: "Mini Burger", price: "7.50", description: "3oz patty with chips" },
        ],
    },
    {
        name: "Drinks",
        description: "Beers, wines & soft drinks",
        items: [
            { name: "Taptide Lager", price: "5.50", description: "Our signature house lager (pint)" },
            { name: "Craft IPA Selection", price: "6.50", description: "Ask your server for today's selection" },
            { name: "House Wine", price: "5.00", description: "Red, white or rosé (175ml)" },
            { name: "Prosecco", price: "7.50", description: "Glass of Italian sparkling" },
            { name: "Soft Drinks", price: "3.00", description: "Coke, lemonade, orange juice" },
        ],
    },
    {
        name: "Cocktails",
        description: "Crafted by our mixologists",
        items: [
            { name: "Coastal Sunset", price: "10.50", description: "Rum, mango, passionfruit, lime" },
            { name: "Taptide Old Fashioned", price: "11.00", description: "Bourbon, bitters, orange, cherry" },
            { name: "Espresso Martini", price: "10.00", description: "Vodka, coffee liqueur, fresh espresso" },
            { name: "Mojito", price: "9.50", description: "Rum, mint, lime, soda" },
            { name: "Margarita", price: "9.50", description: "Tequila, triple sec, lime, salt rim" },
        ],
    },
    {
        name: "Desserts",
        description: "Sweet endings",
        items: [
            { name: "Sticky Toffee Pudding", price: "7.50", description: "With vanilla ice cream & toffee sauce" },
            { name: "Chocolate Brownie", price: "6.95", description: "Warm brownie with cream" },
            { name: "Cheesecake", price: "7.00", description: "Ask for today's flavour" },
            { name: "Ice Cream Selection", price: "5.50", description: "Three scoops of your choice" },
        ],
    },
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("Mains");

    const currentCategory = menuCategories.find((cat) => cat.name === activeCategory);

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
                            OUR MENU
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
                            Fresh, local, coastal-inspired
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

                {/* Category Navigation */}
                <section className="sticky top-0 z-30 py-4 px-6 border-b" style={{ backgroundColor: "var(--antique-cream)", borderColor: "rgba(11, 30, 45, 0.1)" }}>
                    <div className="max-w-5xl mx-auto overflow-x-auto">
                        <div className="flex gap-2 md:gap-4 justify-center min-w-max">
                            {menuCategories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${activeCategory === category.name ? "scale-105" : "opacity-70 hover:opacity-100"
                                        }`}
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        backgroundColor: activeCategory === category.name ? "var(--deep-navy)" : "transparent",
                                        color: activeCategory === category.name ? "var(--antique-cream)" : "var(--deep-navy)",
                                        border: activeCategory === category.name ? "none" : "1px solid var(--deep-navy)",
                                    }}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Menu Items */}
                <section className="py-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Category Header */}
                                <div className="text-center mb-10">
                                    <h2
                                        className="text-3xl md:text-4xl mb-2"
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            color: "var(--deep-navy)",
                                        }}
                                    >
                                        {currentCategory?.name}
                                    </h2>
                                    <p
                                        className="text-lg opacity-60"
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            color: "var(--deep-navy)",
                                        }}
                                    >
                                        {currentCategory?.description}
                                    </p>
                                </div>

                                {/* Items */}
                                <div className="space-y-6">
                                    {currentCategory?.items.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            className="flex justify-between gap-4 pb-6 border-b"
                                            style={{ borderColor: "rgba(11, 30, 45, 0.1)" }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <div className="flex-1">
                                                <h3
                                                    className="text-lg md:text-xl mb-1"
                                                    style={{
                                                        fontFamily: "var(--font-display)",
                                                        color: "var(--deep-navy)",
                                                    }}
                                                >
                                                    {item.name}
                                                </h3>
                                                <p
                                                    className="text-sm opacity-70"
                                                    style={{
                                                        fontFamily: "var(--font-body)",
                                                        color: "var(--deep-navy)",
                                                    }}
                                                >
                                                    {item.description}
                                                </p>
                                            </div>
                                            <span
                                                className="text-xl font-semibold whitespace-nowrap"
                                                style={{
                                                    fontFamily: "var(--font-display)",
                                                    color: "var(--golden-bronze)",
                                                }}
                                            >
                                                £{item.price}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* Footer Note */}
                <section className="py-8 px-6 text-center" style={{ backgroundColor: "var(--deep-navy)" }}>
                    <p
                        className="text-sm opacity-70"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--antique-cream)",
                        }}
                    >
                        Please inform your server of any allergies or dietary requirements.
                        <br />
                        A discretionary 12.5% service charge will be added to parties of 6 or more.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}
