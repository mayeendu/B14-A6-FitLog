import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/banner.png';


const Hero = () => {
    return (
        <section className="bg-bg-primary container mx-auto px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-[#15171D]">

                <div className="flex min-h-[520px] flex-col items-center justify-between px-6 py-12 sm:px-10 md:flex-row md:px-12 lg:px-16">

                    {/* Left Content */}
                    <div className="w-full text-center md:w-1/2 md:text-left">

                        {/* Small Heading */}
                        <p className="mb-6 font-inter text-sm font-bold uppercase tracking-widest text-brand-secondary sm:text-base">
                            Workout Library
                        </p>

                        {/* Main Heading */}
                        <h1 className="max-w-2xl font-oswald text-3xl font-bold uppercase leading-[0.95] text-brand-primary sm:text-2xl md:text-4xl lg:text-5xl">
                            Train with intent. Log every set.
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl font-inter text-base leading-7 text-hero-paragraph sm:text-lg">
                            FitLog is a dark, no-nonsense gym companion: pick a lift,
                            lock it into today&apos;s plan, and watch the week&apos;s
                            work add up.
                        </p>

                        {/* Button */}
                        <button className="mt-8 rounded-md bg-brand-secondary px-7 py-3 font-inter text-sm font-bold uppercase text-[#000000] transition-transform duration-200 hover:scale-105">
                            Browse Workouts
                        </button>

                    </div>


                    {/* Right Image */}
                    <div className="mt-10 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end">

                        <Image
                            src={heroImage}
                            alt="Workout illustration"
                            className="h-auto w-[240px] object-contain sm:w-[300px] md:w-[340px] lg:w-[400px]"
                            priority
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;