
"use client";

import Image from "next/image";
import Link from "next/link";

import logoImage from "../../assets/logo.png";
import { useFitness } from "@/context/FitnessContext";

const Navbar = () => {
    const {
        todayPlan,
        savedExercises,
    } = useFitness();

    return (
        <section className="bg-bg-primary container mx-auto border-b border-[#2d3038]">
            <div className="relative flex justify-between items-center p-4 sm:px-6 lg:px-8 bg-bg-primary text-white">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2"
                >
                    <Image
                        src={logoImage}
                        alt="FITLOG Logo"
                        className="h-6 w-6"
                    />

                    <div className="font-oswald text-xl font-medium">
                        FITLOG
                    </div>
                </Link>


                {/* Desktop & Tablet Navigation */}
                <div className="hidden sm:block">
                    <ul className="flex font-inter space-x-2 md:space-x-4">

                        <li>
                            <Link
                                href="/"
                                className="block text-brand-secondary bg-[#1A2312] rounded-full px-3 md:px-4 py-2"
                            >
                                Workouts
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/plans"
                                className="block px-3 md:px-4 py-2 rounded-full transition-colors hover:bg-[#1A2312] hover:text-brand-secondary"
                            >
                                My Plans
                            </Link>
                        </li>

                    </ul>
                </div>


                {/* Desktop & Tablet Buttons */}
                <div className="hidden sm:flex space-x-2 md:space-x-4">

                    <Link
                        href="/plans"
                        className="px-3 md:px-4 py-2 rounded-full hover:bg-[#1A2312] transition-colors"
                    >
                        Plan ({todayPlan.length})
                    </Link>

                    <Link
                        href="/plans"
                        className="px-3 md:px-4 py-2 rounded-full hover:bg-[#1A2312] transition-colors"
                    >
                        Saved ({savedExercises.length})
                    </Link>

                </div>


                {/* Mobile Menu */}
                <details className="sm:hidden relative">

                    {/* Hamburger */}
                    <summary className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#1A2312] transition-colors list-none">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>

                    </summary>


                    {/* Dropdown */}
                    <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl bg-bg-primary border border-white/10 shadow-xl p-3">

                        <ul className="flex flex-col gap-2 font-inter">

                            <li>
                                <Link
                                    href="/"
                                    className="block text-brand-secondary bg-[#1A2312] rounded-xl px-4 py-3"
                                >
                                    Workouts
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/plans"
                                    className="block px-4 py-3 rounded-xl hover:bg-[#1A2312] hover:text-brand-secondary transition-colors"
                                >
                                    My Plans
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/plans"
                                    className="block px-4 py-3 rounded-xl hover:bg-[#1A2312] transition-colors"
                                >
                                    Plan ({todayPlan.length})
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/plans"
                                    className="block px-4 py-3 rounded-xl hover:bg-[#1A2312] transition-colors"
                                >
                                    Saved ({savedExercises.length})
                                </Link>
                            </li>

                        </ul>

                    </div>

                </details>

            </div>
        </section>
    );
};

export default Navbar;
