import ExerciseActions from "@/ExerciseActions";
import { Exercise } from "@/Types/exercise";
import Image from "next/image";
import Link from "next/link";
import {
} from "react-icons/fa";

interface ExerciseDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const ExerciseDetailsPage = async ({
    params,
}: ExerciseDetailsPageProps) => {
    const { id } = await params;

    const response = await fetch(
        "https://api.abcz.workers.dev/api/fitlog"
    );

    const exercises: Exercise[] = await response.json();

    const exercise = exercises.find(
        (item) => item.id === Number(id)
    );

    // If exercise doesn't exist
    if (!exercise) {
        return (
            <main className="min-h-screen bg-[#101114] px-6 py-20 text-white">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold">
                        Exercise not found
                    </h1>

                    <Link
                        href="/"
                        className="mt-6 inline-block text-[#c2f800]"
                    >
                        ← Back to Library
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#101114] px-4 py-10 text-white sm:px-6 lg:py-14">
            <div className="mx-auto max-w-7xl">

                {/* Main Details Card */}
                <div className="grid gap-8 lg:grid-cols-2">

                    {/* ================= IMAGE ================= */}
                    <div className="relative h-full min-h-[500px] w-full lg:min-h-[660px]">
                        <Image
                            src={exercise.image}
                            alt={exercise.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* ================= DETAILS ================= */}
                    <div className="flex flex-col">

                        {/* Title */}
                        <div>
                            <h1
                                className="text-4xl font-medium font-oswald uppercase leading-none tracking-tight sm:text-5xl"

                            >
                                {exercise.name}
                            </h1>

                            {/* Description */}
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#9ca3af]">
                                {exercise.description}
                            </p>
                        </div>

                        {/* Muscle Groups */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {exercise.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#c2f800] px-4 py-1.5 text-sm font-bold text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* ================= STATS TABLE ================= */}
                        <div className="mt-7 overflow-hidden rounded-2xl border border-[#292c34] bg-[#17181e]">

                            {/* Equipment */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Equipment
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.equipment}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Difficulty
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.difficulty}
                                </span>
                            </div>

                            {/* Sets */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Sets
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.sets}
                                </span>
                            </div>

                            {/* Reps */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Reps
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.reps}
                                </span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Duration
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.duration} min
                                </span>
                            </div>

                            {/* Calories */}
                            <div className="flex items-center justify-between border-b border-[#292c34] px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Calories
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.caloriesBurned} kcal
                                </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-between px-5 py-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9297a3]">
                                    Rating
                                </span>

                                <span className="text-sm text-[#e5e7eb]">
                                    {exercise.rating}
                                </span>
                            </div>
                        </div>

                        {/* ================= INSTRUCTIONS ================= */}
                        <div className="mt-8">
                            <h2 className="text-lg font-bold uppercase tracking-wide">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-4">
                                {exercise.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-4 text-sm leading-6 text-[#b7bac3]"
                                        >
                                            <span className="min-w-[18px] text-[#8f949f]">
                                                {index + 1}.
                                            </span>

                                            <span>{instruction}</span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>

                        {/* ================= ACTION BUTTONS ================= */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <ExerciseActions exercise={exercise} />

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default ExerciseDetailsPage;