"use client";

import { Exercise } from "@/Types/exercise";
import { useFitness } from "@/context/FitnessContext";

interface ExerciseActionsProps {
  exercise: Exercise;
}

const ExerciseActions = ({ exercise }: ExerciseActionsProps) => {
  const { todayPlan, addToTodayPlan } = useFitness();

  // Check whether this exercise is already in Today's Plan
  const isInTodayPlan = todayPlan.some((item) => item.id === exercise.id);

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {/* Add Today's Plan */}
      <button
        type="button"
        onClick={() => addToTodayPlan(exercise)}
        disabled={isInTodayPlan}
        className={`rounded-full px-6 py-3 font-inter font-bold transition ${
          isInTodayPlan
            ? "cursor-not-allowed bg-[#4a4d52] text-[#9ca3af]"
            : "cursor-pointer bg-brand-secondary text-black hover:bg-[#d4ff38]"
        }`}
      >
        {isInTodayPlan ? "✓ Added to Today's Plan" : "Add Today's Plan"}
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={() => {
          // existing save functionality
        }}
        className="cursor-pointer rounded-full border border-brand-secondary px-6 py-3 font-inter font-bold text-brand-secondary transition hover:brand-secondary hover:text-black"
      >
        Save for Later
      </button>
    </div>
  );
};

export default ExerciseActions;
