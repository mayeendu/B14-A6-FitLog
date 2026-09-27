"use client";

import { useState } from "react";
import Link from "next/link";

import { useFitness } from "@/context/FitnessContext";
import PlanExerciseCard from "@/components/exercises/PlanExerciseCard";

type SortOption = "duration" | "calories" | "rating";

const PlansPage = () => {
  const {
    todayPlan,
    savedExercises,
    completedExercises,
    removeFromTodayPlan,
    removeFromSaved,
    toggleCompleted,
  } = useFitness();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const [isSortOpen, setIsSortOpen] = useState(false);

  // ================================
  // CURRENT EXERCISES
  // ================================
  const exercises =
    activeTab === "today" ? todayPlan : savedExercises;

  // ================================
  // SORT EXERCISES
  // ================================
  const sortedExercises = [...exercises].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return a.rating - b.rating;
    }

    return 0;
  });

  // ================================
  // METRICS SUMMARY
  // ================================
  const totalExercises = todayPlan.length;

  const totalMinutes = todayPlan.reduce(
    (total, exercise) => total + exercise.duration,
    0,
  );

  const totalCalories = todayPlan.reduce(
    (total, exercise) => total + exercise.caloriesBurned,
    0,
  );

  // ================================
  // SORT LABEL
  // ================================
  const sortLabels: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <main className="min-h-screen w-full bg-[#101114] px-4 py-12 text-white sm:px-6 lg:py-16">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-350">

        {/* ================= HEADING ================= */}
        <div className="text-base">
          <h1 className="font-oswald text-4xl font-bold uppercase sm:text-5xl">
            My Plans
          </h1>

          <p className="mb-5 mt-3 font-inter text-[#9ca3af]">
            Manage your workout exercises in one place.
          </p>
        </div>

        {/* ================= METRICS SUMMARY ================= */}
        <div className="flex items-center rounded-2xl border border-[#23242f] bg-[#12131a] p-6 text-white">

          {/* Exercises */}
          <div className="flex-1">
            <p className="font-inter text-sm font-medium text-gray-400">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-extrabold text-[#ccff00]">
              {totalExercises}
            </p>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-800/60" />

          {/* Minutes */}
          <div className="flex-1 pl-8">
            <p className="font-inter text-sm font-medium text-gray-400">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-extrabold text-white">
              {totalMinutes}
            </p>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-800/60" />

          {/* Calories */}
          <div className="flex-1 pl-8">
            <p className="font-inter text-sm font-medium text-gray-400">
              Calories
            </p>

            <p className="mt-2 text-4xl font-extrabold text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* ================= TABS + SORT ================= */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Tabs */}
          <div className="flex w-fit rounded-xl border border-[#2d3038] bg-[#17181e] p-1 font-inter">

            {/* Today's Plan */}
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-8 ${activeTab === "today"
                ? "bg-[#1F242D] text-white"
                : "text-[#9ca3af] hover:text-white"
                }`}
            >
              Today's Plan ({todayPlan.length})
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-8 ${activeTab === "saved"
                ? "bg-[#1F242D] text-white"
                : "text-[#9ca3af] hover:text-white"
                }`}
            >
              Saved ({savedExercises.length})
            </button>
          </div>

          {/* ================= SORT BUTTON ================= */}
          <div className="relative flex items-center gap-4 font-inter">

            {/* Sort By Text */}
            <span className="text-md text-[#9ca3af] sm:text-1xl">
              Sort By
            </span>

            {/* Sort Dropdown */}
            <div className="relative">

              {/* Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsSortOpen((previous) => !previous)}
                className="flex min-w-55 cursor-pointer items-center justify-between gap-8 rounded-2xl border-2 border-[#292d38] bg-[#15161c] px-5 py-3 text-md text-white transition hover:border-[#3a3f4c] sm:min-w-50 sm:text-1xl"
              >
                <span>{sortLabels[sortBy]}</span>

                {/* Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`h-6 w-6 text-[#8b919d] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""
                    }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#292d38] bg-[#17181e] p-1 shadow-2xl">

                  {/* Duration */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("duration");
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition sm:text-base ${sortBy === "duration"
                      ? "bg-[#c2f800] text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy === "duration"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>Duration</span>
                  </button>

                  {/* Calories */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("calories");
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition sm:text-base ${sortBy === "calories"
                      ? "bg-[#c2f800] text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy === "calories"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>Calories</span>
                  </button>

                  {/* Rating */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("rating");
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition sm:text-base ${sortBy === "rating"
                      ? "bg-[#c2f800] text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy === "rating"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>Rating</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= SECTION TITLE ================= */}
        <div className="mt-12 font-inter">
          <h2 className="text-2xl font-bold">
            {activeTab === "today"
              ? "Today's Exercises"
              : "Saved Exercises"}
          </h2>

          <p className="mt-2 text-[#9ca3af]">
            {sortedExercises.length} exercise
            {sortedExercises.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        {/* ================= EXERCISE LIST ================= */}
        {sortedExercises.length > 0 && (
          <div className="mt-6 w-full space-y-3">

            {sortedExercises.map((exercise) => (
              <PlanExerciseCard
                key={exercise.id}
                exercise={exercise}
                activeTab={activeTab}
                isCompleted={completedExercises.includes(
                  exercise.id,
                )}
                onToggleCompleted={toggleCompleted}
                onRemove={
                  activeTab === "today"
                    ? removeFromTodayPlan
                    : removeFromSaved
                }
              />
            ))}

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {sortedExercises.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">

            <h3 className="text-xl font-bold">
              {activeTab === "today"
                ? "NOTHING HERE YET"
                : "No saved exercises"}
            </h3>

            <p className="mt-3 font-inter text-[#9ca3af]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-block rounded-full bg-brand-secondary px-6 py-2 font-bold text-black transition hover:bg-[#d4ff38]"
            >
              Go to workout
            </Link>

          </div>
        )}
      </div>
    </main>
  );
};

export default PlansPage;