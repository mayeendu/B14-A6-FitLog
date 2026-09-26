"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useFitness } from "@/context/FitnessContext";
import Image from "next/image";

const PlansPage = () => {
    const {
        todayPlan,
        savedExercises,
        removeFromTodayPlan,
        removeFromSaved,
    } = useFitness();

    const [activeTab, setActiveTab] = useState<
        "today" | "saved"
    >("today");

    const exercises =
        activeTab === "today"
            ? todayPlan
            : savedExercises;

    return (
        <main className="min-h-screen bg-[#101114] px-4 py-16 text-white sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-4xl font-black uppercase sm:text-5xl">
                        My Plans
                    </h1>

                    <p className="mt-3 text-[#9ca3af]">
                        Manage your workout exercises in one place.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mt-10 flex justify-center">
                    <div className="flex rounded-xl border border-[#2d3038] bg-[#17181e] p-1">

                        {/* Today's Plan */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("today")}
                            className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-7 ${activeTab === "today"
                                ? "bg-[#c2f800] text-black"
                                : "text-[#9ca3af] hover:text-white"
                                }`}
                        >
                            Today's Plan ({todayPlan.length})
                        </button>

                        {/* Saved */}
                        <button
                            type="button"
                            onClick={() => setActiveTab("saved")}
                            className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-7 ${activeTab === "saved"
                                ? "bg-[#c2f800] text-black"
                                : "text-[#9ca3af] hover:text-white"
                                }`}
                        >
                            Saved for Later ({savedExercises.length})
                        </button>

                    </div>
                </div>

                {/* Section title */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold">
                        {activeTab === "today"
                            ? "Today's Exercises"
                            : "Saved Exercises"}
                    </h2>

                    <p className="mt-2 text-[#9ca3af]">
                        {exercises.length} exercise
                        {exercises.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Cards */}
                {exercises.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {exercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="relative overflow-hidden rounded-[28px] border border-[#2d3038] bg-[#16171c]"
                            >

                                {/* Remove button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (activeTab === "today") {
                                            removeFromTodayPlan(exercise.id);
                                        } else {
                                            removeFromSaved(exercise.id);
                                        }
                                    }}
                                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-[#c2f800] hover:text-black"
                                    aria-label={`Remove ${exercise.name}`}
                                >
                                    <FaTimes />
                                </button>

                                {/* Image */}
                                <Image
                                    src={exercise.image}
                                    alt={exercise.name}
                                    width={600}
                                    height={400}
                                    className="h-64 w-full object-cover"
                                />

                                {/* Content */}
                                <div className="p-6">

                                    {/* Muscle groups */}
                                    <div className="flex flex-wrap gap-2">
                                        {exercise.muscleGroups.map((muscle) => (
                                            <span
                                                key={muscle}
                                                className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold uppercase text-black"
                                            >
                                                {muscle}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Name */}
                                    <h3
                                        className="mt-5 text-2xl font-black uppercase"
                                        style={{
                                            fontFamily:
                                                "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                                        }}
                                    >
                                        {exercise.name}
                                    </h3>

                                    {/* Equipment */}
                                    <p className="mt-3 text-[#9ca3af]">
                                        {exercise.equipment}
                                    </p>

                                    {/* Stats */}
                                    <div className="mt-5 border-t border-[#2d3038] pt-5">
                                        <div className="flex justify-between text-sm text-[#9ca3af]">
                                            <span>
                                                {exercise.duration} min
                                            </span>

                                            <span>
                                                {exercise.caloriesBurned} kcal
                                            </span>

                                            <span>
                                                ⭐ {exercise.rating}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Empty state */}
                {exercises.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">
                        <h3 className="text-xl font-bold">
                            {activeTab === "today"
                                ? "No exercises in today's plan"
                                : "No saved exercises"}
                        </h3>

                        <p className="mt-3 text-[#9ca3af]">
                            Add some exercises from the exercise library.
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
};

export default PlansPage;