"use client";

import Link from "next/link";
import { FaClock, FaFire, FaStar, FaTimes } from "react-icons/fa";

import { Exercise } from "@/Types/exercise";
import Image from "next/image";

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
  return (
    <article className="flex items-center gap-4 rounded-xl border border-[#292c34] bg-[#17181e] p-3 transition duration-300 hover:border-[#3b3f49] sm:gap-5">
      {/* Exercise Image */}
      <div className="relative h-16 w-auto shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
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
        <div className="mt-2 flex font-inter flex-wrap items-center gap-3 text-xs text-[#b4b7c0]">
          <span className="flex items-center gap-1">
            <FaClock className="text-[#c2f800]" />
            {exercise.duration} min
          </span>

          <span className="flex font-inter items-center gap-1">
            <FaFire className="text-[#c2f800]" />
            {exercise.caloriesBurned} kcal
          </span>

          <span className="flex font-inter items-center gap-1">
            <FaStar className="text-[#c2f800]" />
            {exercise.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        {/* View Details */}
        <Link
          href={`/exercises/${exercise.id}`}
          className="rounded-full border border-[#343842] px-5 py-2 text-xs font-inter font-medium text-white transition hover:border-[#c2f800] hover:text-[#c2f800]"
        >
          View Details
        </Link>

        {/* Main Action */}
        {activeTab === "today" ? (
          <button
            type="button"
            onClick={() => onToggleCompleted(exercise.id)}
            className={`rounded-full px-5 py-2 text-xs font-bold text-black transition ${
              isCompleted
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600]   hover:bg-[#C2F800]"
            }`}
          >
            {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
          </button>
        ) : (
          <button
            type="button"
            className="rounded-full bg-brand-secondary px-5 py-2 font-inter text-xs font-bold text-black transition hover:bg-[#d4ff38]"
          >
            Add to Today's Plan
          </button>
        )}
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        aria-label={`Remove ${exercise.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#777c87] transition hover:bg-[#252830] hover:text-white"
      >
        <FaTimes />
      </button>

      {/* Mobile Actions */}
      <div className="flex sm:hidden">
        <Link
          href={`/exercises/${exercise.id}`}
          className="rounded-full border border-[#343842] px-3 py-2 text-xs text-white"
        >
          View
        </Link>
      </div>
    </article>
  );
};

export default PlanExerciseCard;
