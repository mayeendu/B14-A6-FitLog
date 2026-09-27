"use client";

import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Exercise } from "@/Types/exercise";
import ExerciseCard from "@/components/exercises/ExerciseCard";

interface LibraryContentProps {
    exercises: Exercise[];
}

const LibraryContent = ({
    exercises,
}: LibraryContentProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExercises = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return exercises;
        }

        return exercises.filter((exercise) => {
            const name = exercise.name.toLowerCase();

            const muscleGroups =
                exercise.muscleGroups
                    .join(" ")
                    .toLowerCase();

            const equipment =
                exercise.equipment.toLowerCase();

            const difficulty =
                exercise.difficulty.toLowerCase();

            return (
                name.includes(query) ||
                muscleGroups.includes(query) ||
                equipment.includes(query) ||
                difficulty.includes(query)
            );
        });
    }, [exercises, searchTerm]);

    return (
        <>
            {/* Search */}
            <div className="mb-8 w-full max-w-xl">
                <div className="relative">
                    <FaSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                        aria-hidden="true"
                    />

                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        placeholder="Search workouts, muscles, equipment..."
                        aria-label="Search workouts"
                        className="w-full rounded-full border border-[#2d3038] bg-[#17181e] py-3 pl-11 pr-5 font-inter text-sm text-white outline-none transition placeholder:text-[#6b7280] focus:border-[#c2f800]"
                    />
                </div>
            </div>

            {/* Result Count */}
            <p className="mb-6 font-inter text-sm text-[#9ca3af]">
                {filteredExercises.length}{" "}
                {filteredExercises.length === 1
                    ? "workout"
                    : "workouts"}{" "}
                found
            </p>

            {/* Exercise Grid */}
            {filteredExercises.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredExercises.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                        />
                    ))}
                </div>
            ) : (
                /* No Results */
                <div className="rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">
                    <h3 className="font-oswald text-2xl font-bold uppercase text-white">
                        No workouts found
                    </h3>

                    <p className="mt-3 font-inter text-sm text-[#9ca3af]">
                        Try another workout name, muscle group,
                        equipment, or difficulty.
                    </p>
                </div>
            )}
        </>
    );
};

export default LibraryContent;