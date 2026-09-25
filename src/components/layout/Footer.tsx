
import React from 'react';
import logoImage from '../../assets/logo.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 p-4 sm:px-6 lg:px-8 bg-bg-primary text-white">

            {/* Logo */}
            <div>
                <div className="flex items-center space-x-2">
                    <Image
                        src={logoImage}
                        alt="Logo"
                        className="h-4 w-4"
                    />

                    <div className="font-oswald text-[1rem] font-semibold">
                        FITLOG
                    </div>
                </div>
            </div>


            {/* Copyright */}
            <div>
                <p className="text-[0.875rem] text-center">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>

        </div>
    );
};

export default Footer;

