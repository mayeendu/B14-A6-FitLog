"use client";

import { useState } from "react";
import { useFitness } from "@/context/FitnessContext";
import PlanExerciseCard from "@/components/exercises/PlanExerciseCard";

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

  const exercises = activeTab === "today" ? todayPlan : savedExercises;

  return (
    <main className="min-h-screen w-full bg-[#101114] px-4 py-12 text-white sm:px-6 lg:py-16">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-[1400px]">
        {/* ================= HEADING ================= */}
        <div className="text-base">
          <h1 className="text-4xl font-bold font-oswald uppercase sm:text-5xl">
            My Plans
          </h1>

          <p className="mt-3 text-[#9ca3af] font-inter">
            Manage your workout exercises in one place.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-10 flex font-inter ">
          <div className="flex rounded-xl border border-[#2d3038] bg-[#17181e] p-1">
            {/* Today's Plan */}
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-8 ${
                activeTab === "today"
                  ? "bg-[#1F242D] text-white"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              Today's Plan ({todayPlan.length})
            </button>

            {/* Saved for Later */}
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-5 py-3 text-sm font-bold transition sm:px-8 ${
                activeTab === "saved"
                  ? "bg-[#1F242D] text-White"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              Saved ({savedExercises.length})
            </button>
          </div>
        </div>

        {/* ================= SECTION TITLE ================= */}
        <div className="mt-12 font-inter">
          <h2 className="text-2xl font-bold">
            {activeTab === "today" ? "Today's Exercises" : "Saved Exercises"}
          </h2>

          <p className="mt-2 text-[#9ca3af]">
            {exercises.length} exercise selected
            {exercises.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ================= EXERCISE LIST ================= */}
        {exercises.length > 0 && (
          <div className="mt-6 w-full space-y-3">
            {exercises.map((exercise) => (
              <PlanExerciseCard
                key={exercise.id}
                exercise={exercise}
                activeTab={activeTab}
                isCompleted={completedExercises.includes(exercise.id)}
                onToggleCompleted={toggleCompleted}
                onRemove={
                  activeTab === "today" ? removeFromTodayPlan : removeFromSaved
                }
              />
            ))}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {exercises.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#2d3038] bg-[#17181e] px-6 py-16 text-center">
            <h3 className="text-xl font-bold">
              {activeTab === "today"
                ? "No exercises in today's plan"
                : "No saved exercises"}
            </h3>

            <p className="mt-3 text-[#9ca3af] font-inter">
              Add some exercises from the exercise library.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlansPage;
