import Link from "next/link";
import { FaArrowLeft, FaDumbbell } from "react-icons/fa";

const NotFound = () => {
    return (
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#101114] px-4 py-16">
            <div className="w-full max-w-2xl text-center">

                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#17181e] text-[#c2f800]">
                    <FaDumbbell className="text-3xl" />
                </div>

                {/* 404 */}
                <p className="mt-8 font-oswald text-8xl font-bold text-[#c2f800] sm:text-9xl">
                    404
                </p>

                {/* Heading */}
                <h1 className="mt-4 font-oswald text-3xl font-bold uppercase text-white sm:text-4xl">
                    Workout Not Found
                </h1>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-lg font-inter text-sm leading-7 text-[#9ca3af] sm:text-base">
                    Looks like this page took a rest day. The workout or page you&apos;re
                    looking for doesn&apos;t exist.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c2f800] px-6 py-3 font-inter text-sm font-bold text-black transition hover:bg-[#d4ff38]"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to FitLog
                </Link>
            </div>
        </main>
    );
};

export default NotFound;