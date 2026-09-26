"use client";

import Link from "next/link";
import Image from "next/image";

import { FaClock, FaFire, FaStar, FaTimes } from "react-icons/fa";

import { Exercise } from "@/Types/exercise";
import { useFitness } from "@/context/FitnessContext";

interface PlanExerciseCardProps {
  exercise: Exercise;
  activeTab: "today" | "saved";
  onRemove: (id: number) => void;
  isCompleted: boolean;
  onToggleCompleted: (id: number) => void;
}

const PlanExerciseCard = ({
  exercise,
  activeTab,
  onRemove,
  isCompleted,
  onToggleCompleted,
}: PlanExerciseCardProps) => {
  const { todayPlan, toggleTodayPlan } = useFitness();

  // Check whether this exercise is already in Today's Plan
  const isInTodayPlan = todayPlan.some((item) => item.id === exercise.id);

  return (
    <article className="flex w-full items-center gap-4 rounded-xl border border-[#292c34] bg-[#17181e] p-3 transition duration-300 hover:border-[#3b3f49] sm:gap-5">
      {/* Exercise Image */}
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Exercise Information */}
      <div className="min-w-0 flex-1">
        {/* Exercise Name */}
        <h3 className="truncate text-sm font-oswald font-bold uppercase text-white sm:text-base">
          {exercise.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 truncate font-inter text-xs text-[#9ca3af]">
          {exercise.equipment}
        </p>

        {/* Stats */}
        <div className="mt-2 flex flex-wrap items-center gap-3 font-inter text-xs text-[#b4b7c0]">
          {/* Duration */}
          <span className="flex items-center gap-1">
            <FaClock className="text-brand-secondary" />
            {exercise.duration} min
          </span>

          {/* Calories */}
          <span className="flex items-center gap-1">
            <FaFire className="text-brand-secondary" />
            {exercise.caloriesBurned} kcal
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1">
            <FaStar className="text-brand-secondary" />
            {exercise.rating}
          </span>
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        {/* View Details */}
        <Link
          href={`/exercises/${exercise.id}`}
          className="rounded-full border border-[#343842] px-5 py-2 font-inter text-xs font-medium text-white transition hover:border-brand-secondary hover:text-brand-secondary"
        >
          View Details
        </Link>

        {/* Main Action */}
        {activeTab === "today" ? (
          /* Today's Plan → Complete Button */
          <button
            type="button"
            onClick={() => onToggleCompleted(exercise.id)}
            className={`rounded-full px-5 py-2 text-xs font-bold text-black transition ${
              isCompleted
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
            }`}
          >
            {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
          </button>
        ) : (
          /* Saved → Today's Plan Toggle */
          <button
            type="button"
            onClick={() => toggleTodayPlan(exercise)}
            className={`rounded-full px-5 py-2 font-inter text-xs font-bold text-black transition ${
              isInTodayPlan
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
            }`}
          >
            {isInTodayPlan ? "✓ Plan Added" : "Add to Today's Plan"}
          </button>
        )}
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        aria-label={`Remove ${exercise.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#777c87] transition hover:bg-[#252830] hover:text-white"
      >
        <FaTimes />
      </button>

      {/* Mobile View Button */}
      <div className="flex sm:hidden">
        <Link
          href={`/exercises/${exercise.id}`}
          className="rounded-full border border-[#343842] px-3 py-2 text-xs text-white transition hover:border-brand-secondary hover:text-brand-secondary"
        >
          View
        </Link>
      </div>
    </article>
  );
};

export default PlanExerciseCard;
