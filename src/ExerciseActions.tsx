"use client";

import { Exercise } from "@/Types/exercise";
import { useFitness } from "@/context/FitnessContext";

import {
    FaCalendarPlus,
    FaBookmark,
} from "react-icons/fa";

interface ExerciseActionsProps {
    exercise: Exercise;
}

const ExerciseActions = ({
    exercise,
}: ExerciseActionsProps) => {
    const {
        addToTodayPlan,
        saveForLater,
    } = useFitness();

    return (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
                type="button"
                onClick={() => addToTodayPlan(exercise)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#c2f800] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#d2ff33]"
            >
                <FaCalendarPlus />

                Add to Today's plan
            </button>

            <button
                type="button"
                onClick={() => saveForLater(exercise)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#343842] bg-transparent px-6 py-3.5 text-sm font-medium text-white transition hover:border-[#c2f800] hover:text-[#c2f800]"
            >
                <FaBookmark />

                Save for later
            </button>

        </div>
    );
};

export default ExerciseActions;