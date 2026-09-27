
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
    <article
      className="
        flex w-full flex-col gap-3 rounded-xl border border-[#292c34]
        bg-[#17181e] p-3
        transition duration-300 hover:border-[#3b3f49]

        sm:flex-row sm:items-center sm:gap-4 sm:p-4
        lg:gap-5
      "
    >
      {/* Exercise Image */}
      <div
        className="
          relative h-44 w-full shrink-0 overflow-hidden rounded-lg

          sm:h-20 sm:w-28
          md:h-24 md:w-32
          lg:h-20 lg:w-28
        "
      >
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1023px) 128px,
            112px
          "
          className="object-cover"
        />
      </div>

      {/* Exercise Information */}
      <div className="min-w-0 flex-1">
        {/* Exercise Name */}
        <h3
          className="
            truncate font-oswald text-sm font-bold uppercase text-white

            sm:text-base
            lg:text-base
          "
        >
          {exercise.name}
        </h3>

        {/* Equipment */}
        <p
          className="
            mt-1 truncate font-inter text-xs text-[#9ca3af]

            sm:text-xs
          "
        >
          {exercise.equipment}
        </p>

        {/* Stats */}
        <div
          className="
            mt-2 flex flex-wrap items-center gap-x-3 gap-y-2
            font-inter text-xs text-[#b4b7c0]

            sm:gap-x-3
            md:gap-x-4
          "
        >
          {/* Duration */}
          <span className="flex items-center gap-1 whitespace-nowrap">
            <FaClock className="text-brand-secondary" />
            {exercise.duration} min
          </span>

          {/* Calories */}
          <span className="flex items-center gap-1 whitespace-nowrap">
            <FaFire className="text-brand-secondary" />
            {exercise.caloriesBurned} kcal
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1 whitespace-nowrap">
            <FaStar className="text-brand-secondary" />
            {exercise.rating}
          </span>
        </div>
      </div>

      {/* Desktop / Tablet Actions */}
      <div
        className="
          hidden shrink-0 items-center gap-2

          sm:flex
          md:gap-3
        "
      >
        {/* View Details */}
        <Link
          href={`/exercises/${exercise.id}`}
          className="
            rounded-full border border-[#343842]
            px-3 py-2
            font-inter text-xs font-medium text-white
            transition
            hover:border-brand-secondary hover:text-brand-secondary

            md:px-4
            lg:px-5
          "
        >
          View Details
        </Link>

        {/* Main Action */}
        {activeTab === "today" ? (
          /* Today's Plan → Complete Button */
          <button
            type="button"
            onClick={() => onToggleCompleted(exercise.id)}
            className={`
              whitespace-nowrap rounded-full
              px-3 py-2
              text-xs font-bold text-black
              transition

              md:px-4
              lg:px-5

              ${isCompleted
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
              }
            `}
          >
            {isCompleted ? "✓ Completed" : "✓ Mark as Done"}
          </button>
        ) : (
          /* Saved → Today's Plan Toggle */
          <button
            type="button"
            onClick={() => toggleTodayPlan(exercise)}
            className={`
              whitespace-nowrap rounded-full
              px-3 py-2
              font-inter text-xs font-bold text-black
              transition

              md:px-4
              lg:px-5

              ${isInTodayPlan
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
              }
            `}
          >
            {isInTodayPlan ? "✓ Plan Added" : "Add to Today's Plan"}
          </button>
        )}
      </div>

      {/* Mobile Actions */}
      <div
        className="
          flex w-full items-center gap-2

          sm:hidden
        "
      >
        {/* View Button */}
        <Link
          href={`/exercises/${exercise.id}`}
          className="
            flex flex-1 items-center justify-center
            rounded-full border border-[#343842]
            px-3 py-2
            text-xs font-medium text-white
            transition
            hover:border-brand-secondary hover:text-brand-secondary
          "
        >
          View
        </Link>

        {/* Main Mobile Action */}
        {activeTab === "today" ? (
          <button
            type="button"
            onClick={() => onToggleCompleted(exercise.id)}
            className={`
              flex-1 rounded-full
              px-3 py-2
              text-xs font-bold text-black
              transition

              ${isCompleted
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
              }
            `}
          >
            {isCompleted ? "✓ Completed" : "✓ Mark Done"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toggleTodayPlan(exercise)}
            className={`
              flex-1 rounded-full
              px-3 py-2
              font-inter text-xs font-bold text-black
              transition

              ${isInTodayPlan
                ? "bg-green-600 hover:bg-green-500"
                : "bg-[#9BC600] hover:bg-brand-secondary"
              }
            `}
          >
            {isInTodayPlan ? "✓ Added" : "Add to Plan"}
          </button>
        )}

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(exercise.id)}
          aria-label={`Remove ${exercise.name}`}
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full
            text-[#777c87]
            transition
            hover:bg-[#252830] hover:text-white
          "
        >
          <FaTimes />
        </button>
      </div>

      {/* Desktop Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(exercise.id)}
        aria-label={`Remove ${exercise.name}`}
        className="
          hidden h-8 w-8 shrink-0
          items-center justify-center
          rounded-full
          text-[#777c87]
          transition
          hover:bg-[#252830] hover:text-white

          sm:flex
        "
      >
        <FaTimes />
      </button>
    </article>
  );
};

export default PlanExerciseCard;
