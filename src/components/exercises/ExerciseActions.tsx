"use client";

import { Exercise } from "@/Types/exercise";
import { useFitness } from "@/context/FitnessContext";

interface ExerciseActionsProps {
  exercise: Exercise;
}

const ExerciseActions = ({ exercise }: ExerciseActionsProps) => {
  const { addToTodayPlan, saveForLater } = useFitness();

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        type="button"
        onClick={() => addToTodayPlan(exercise)}
        className="cursor-pointer rounded-full bg-[#c2f800] px-6 py-3 font-bold text-black transition hover:bg-[#d4ff38]"
      >
        Add Today's Plan
      </button>

      <button
        type="button"
        onClick={() => saveForLater(exercise)}
        className="cursor-pointer rounded-full border border-[#c2f800] px-6 py-3 font-bold text-[#c2f800] transition hover:bg-[#c2f800] hover:text-black"
      >
        Save for Later
      </button>
    </div>
  );
};

export default ExerciseActions;
