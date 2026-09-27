"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";

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

  // --------------------------------------------
  // Tab state
  // --------------------------------------------

  const [activeTab, setActiveTab] =
    useState<"today" | "saved">("today");

  // --------------------------------------------
  // Search state
  // --------------------------------------------

  const [searchTerm, setSearchTerm] =
    useState("");

  // --------------------------------------------
  // Sort state
  // --------------------------------------------

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [isSortOpen, setIsSortOpen] =
    useState(false);

  // --------------------------------------------
  // Current exercises
  // --------------------------------------------

  const exercises =
    activeTab === "today"
      ? todayPlan
      : savedExercises;

  // --------------------------------------------
  // Summary statistics
  // --------------------------------------------

  const totalExercises =
    todayPlan.length;

  const totalMinutes =
    todayPlan.reduce(
      (total, exercise) =>
        total + exercise.duration,
      0
    );

  const totalCalories =
    todayPlan.reduce(
      (total, exercise) =>
        total + exercise.caloriesBurned,
      0
    );

  // --------------------------------------------
  // Search
  // --------------------------------------------

  const filteredExercises = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    if (!query) {
      return exercises;
    }

    return exercises.filter((exercise) => {
      const name =
        exercise.name.toLowerCase();

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

  // --------------------------------------------
  // Sort
  // --------------------------------------------

  const sortedExercises = useMemo(() => {
    return [...filteredExercises].sort(
      (a, b) => {
        if (sortBy === "duration") {
          return a.duration - b.duration;
        }

        if (sortBy === "calories") {
          return (
            a.caloriesBurned -
            b.caloriesBurned
          );
        }

        return a.rating - b.rating;
      }
    );
  }, [filteredExercises, sortBy]);

  // --------------------------------------------
  // Sort labels
  // --------------------------------------------

  const sortLabels: Record<
    SortOption,
    string
  > = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <main className="min-h-screen w-full bg-[#101114] px-4 py-12 text-white sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-350">

        {/* ---------------------------------- */}
        {/* Page Header */}
        {/* ---------------------------------- */}

        <div className="text-base">
          <h1 className="font-oswald text-4xl font-bold uppercase sm:text-5xl">
            My Plans
          </h1>

          <p className="mb-5 mt-3 font-inter text-[#9ca3af]">
            Manage your workout exercises in one place.
          </p>
        </div>

        {/* ---------------------------------- */}
        {/* Statistics */}
        {/* ---------------------------------- */}

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#23242f] bg-[#12131a] sm:grid-cols-3 sm:divide-x sm:divide-[#2d3038]">
          {/* Exercises */}
          <div className="px-6 py-7 sm:px-8">
            <p className="font-inter text-sm font-medium text-[#9ca3af]">
              Exercises
            </p>

            <div className="mt-2 flex items-end gap-2">
              <p className="font-inter text-4xl font-extrabold leading-none text-brand-secondary">
                {totalExercises}
              </p>

              <span className="mb-0.5 font-inter text-sm text-[#6b7280]">
                / 5
              </span>
            </div>

            <p className="mt-3 font-inter text-xs text-[#6b7280]">
              {`Today's workout limit`}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-t border-[#2d3038] px-6 py-7 sm:border-t-0 sm:px-8">
            <p className="font-inter text-sm font-medium text-[#9ca3af]">
              Minutes
            </p>

            <p className="mt-2 font-inter text-4xl font-extrabold leading-none text-white">
              {totalMinutes}
            </p>

            <p className="mt-3 font-inter text-xs text-[#6b7280]">
              Total workout time
            </p>
          </div>

          {/* Calories */}
          <div className="border-t border-[#2d3038] px-6 py-7 sm:border-t-0 sm:px-8">
            <p className="font-inter text-sm font-medium text-[#9ca3af]">
              Calories
            </p>

            <p className="mt-2 font-inter text-4xl font-extrabold leading-none text-white">
              {totalCalories}
            </p>

            <p className="mt-3 font-inter text-xs text-[#6b7280]">
              Estimated calories
            </p>
          </div>
        </div>

        {/* ---------------------------------- */}
        {/* Tabs + Search + Sort */}
        {/* ---------------------------------- */}

        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Tabs */}
          <div className="flex w-fit rounded-xl border border-[#2d3038] bg-[#17181e] p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("today");
                setSearchTerm("");
              }}
              className={`rounded-lg px-5 py-3 font-inter text-sm font-bold transition sm:px-8 ${activeTab === "today"
                ? "bg-[#1F242D] text-white"
                : "text-[#9ca3af] hover:text-white"
                }`}
            >
              {`Today's Plan`} ({todayPlan.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("saved");
                setSearchTerm("");
              }}
              className={`rounded-lg px-5 py-3 font-inter text-sm font-bold transition sm:px-8 ${activeTab === "saved"
                ? "bg-[#1F242D] text-white"
                : "text-[#9ca3af] hover:text-white"
                }`}
            >
              Saved ({savedExercises.length})
            </button>
          </div>

          {/* Search + Sort */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                aria-hidden="true"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search workouts..."
                aria-label="Search workouts"
                className="w-full rounded-xl border border-[#2d3038] bg-[#17181e] py-3 pl-11 pr-4 font-inter text-sm text-white outline-none transition placeholder:text-[#6b7280] focus:border-brand-secondary]"
              />
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setIsSortOpen(
                    (previous) =>
                      !previous
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2d3038] bg-[#17181e] px-5 py-3 font-inter text-sm font-medium text-white transition hover:border-brand-secondary sm:w-auto"
              >
                <FaSortAmountDown className="text-brand-secondary" />

                <span>
                  Sort:{" "}
                  {sortLabels[sortBy]}
                </span>
              </button>

              {/* Sort Dropdown */}
              {isSortOpen && (
                <div className="absolute right-0 z-20 mt-2 w-full min-w-44 rounded-xl border border-[#2d3038] bg-[#17181e] p-2 shadow-xl sm:w-52">

                  {/* Duration */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy(
                        "duration"
                      );
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-inter text-sm font-medium transition ${sortBy ===
                      "duration"
                      ? "bg-brand-secondary text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy ===
                        "duration"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>
                      Duration
                    </span>
                  </button>

                  {/* Calories */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy(
                        "calories"
                      );
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-inter text-sm font-medium transition ${sortBy ===
                      "calories"
                      ? "bg-brand-secondary text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy ===
                        "calories"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>
                      Calories
                    </span>
                  </button>

                  {/* Rating */}
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy(
                        "rating"
                      );
                      setIsSortOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-inter text-sm font-medium transition ${sortBy ===
                      "rating"
                      ? "bg-brand-secondary text-black"
                      : "text-white hover:bg-[#252830]"
                      }`}
                  >
                    <span
                      className={`w-4 text-center transition-opacity ${sortBy ===
                        "rating"
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      ✓
                    </span>

                    <span>
                      Rating
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------- */}
        {/* Section Heading */}
        {/* ---------------------------------- */}

        <div className="mt-12 font-inter">
          <h2 className="text-2xl font-bold">
            {activeTab === "today"
              ? "Today's Exercises"
              : "Saved Exercises"}
          </h2>

          <p className="mt-2 text-[#9ca3af]">
            {sortedExercises.length}{" "}
            {sortedExercises.length === 1
              ? "exercise"
              : "exercises"}{" "}
            selected
          </p>
        </div>

        {/* ---------------------------------- */}
        {/* Exercise List */}
        {/* ---------------------------------- */}

        {sortedExercises.length > 0 && (
          <div className="mt-6 w-full space-y-3">
            {sortedExercises.map(
              (exercise) => (
                <PlanExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  activeTab={activeTab}
                  isCompleted={completedExercises.includes(
                    exercise.id
                  )}
                  onToggleCompleted={
                    toggleCompleted
                  }
                  onRemove={
                    activeTab === "today"
                      ? removeFromTodayPlan
                      : removeFromSaved
                  }
                />
              )
            )}
          </div>
        )}

        {/* ---------------------------------- */}
        {/* No Search Results */}
        {/* ---------------------------------- */}

        {sortedExercises.length === 0 &&
          searchTerm.trim() !== "" && (
            <div className="mt-8 rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">
              <h3 className="font-oswald text-xl font-bold uppercase">
                No workouts found
              </h3>

              <p className="mt-3 font-inter text-[#9ca3af]">
                Try another workout name,
                muscle group, equipment, or
                difficulty.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
                className="mt-5 rounded-full bg-brand-secondary px-6 py-2 font-inter font-bold text-black transition hover:bg-[#d4ff38]"
              >
                Clear Search
              </button>
            </div>
          )}

        {/* ---------------------------------- */}
        {/* Empty Plan */}
        {/* ---------------------------------- */}

        {exercises.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">
            <h3 className="font-oswald text-xl font-bold uppercase">
              {activeTab === "today"
                ? "Nothing Here Yet"
                : "No Saved Exercises"}
            </h3>

            <p className="mt-3 font-inter text-[#9ca3af]">
              Browse the library and add a
              workout to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-block rounded-full bg-brand-secondary px-6 py-2 font-inter font-bold text-black transition hover:bg-[#d4ff38]"
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