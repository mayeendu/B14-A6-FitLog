import React from 'react';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';

const Navbar = () => {
    return (
        <section className="bg-bg-primary container mx-auto">
            <div className="relative flex justify-between items-center p-4 sm:px-6 lg:px-8 bg-bg-primary text-white">

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Image
                        src={logoImage}
                        alt="Logo"
                        className="h-6 w-6"
                    />

                    <div className="font-oswald text-xl font-medium">
                        FITLOG
                    </div>
                </div>


                {/* Desktop & Tablet Navigation */}
                <div className="hidden sm:block">
                    <ul className="flex font-inter space-x-2 md:space-x-4">

                        <li className="text-brand-secondary bg-[#1A2312] rounded-full px-3 md:px-4 py-2 cursor-pointer">
                            Workouts
                        </li>

                        <li className="px-3 md:px-4 py-2 rounded-full transition-colors cursor-pointer hover:bg-[#1A2312] hover:text-brand-secondary">
                            My Plans
                        </li>

                    </ul>
                </div>


                {/* Desktop & Tablet Buttons */}
                <div className="hidden sm:flex space-x-2 md:space-x-4">

                    <button className="px-3 md:px-4 py-2 rounded-full hover:bg-[#1A2312] transition-colors">
                        Plan (0)
                    </button>

                    <button className="px-3 md:px-4 py-2 rounded-full hover:bg-[#1A2312] transition-colors">
                        Saved (0)
                    </button>

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

                            <li className="text-brand-secondary bg-[#1A2312] rounded-xl px-4 py-3 cursor-pointer">
                                Workouts
                            </li>

                            <li className="px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1A2312] hover:text-brand-secondary transition-colors">
                                My Plans
                            </li>

                            <li className="px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1A2312] transition-colors">
                                Plan (0)
                            </li>

                            <li className="px-4 py-3 rounded-xl cursor-pointer hover:bg-[#1A2312] transition-colors">
                                Saved (0)
                            </li>

                        </ul>

                    </div>

                </details>

            </div>
        </section>
    );
};

export default Navbar;