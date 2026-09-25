import { Exercise } from "@/Types/exercise";
import Image from "next/image";
import { FaRegClock, FaFire, FaStar } from "react-icons/fa";

interface ExerciseCardProps {
    exercise: Exercise;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
    return (
        <article className="overflow-hidden rounded-[28px] border border-[#2d3038] bg-[#16171c] text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#baff00]">

            {/* Exercise Image */}
            <div className="h-64 w-full overflow-hidden">
                <Image src={exercise.image}
                    alt={exercise.name} width={400} height={400}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>

            {/* Card Content */}
            <div className="px-7 py-7">

                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-3">
                    {exercise.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full bg-brand-secondary px-5 py-2 font-inter text-sm font-bold uppercase tracking-wide text-black"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Exercise Name */}
                <h3
                    className="mt-8 text-3xl font-oswald font-medium uppercase leading-none tracking-wide"
                >
                    {exercise.name}
                </h3>

                {/* Equipment */}
                <p className="mt-5 text-lg text-[#a3a7b5]">
                    {exercise.equipment}
                </p>

                {/* Divider */}
                <div className="my-8 h-px bg-[#30323a]" />

                {/* Exercise Stats */}
                <div className="flex items-center justify-between gap-4 text-[#a3a7b5]">

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                        <FaRegClock className="text-xl" />

                        <span className="text-lg">
                            {exercise.duration} min
                        </span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-2">
                        <FaFire className="text-xl" />

                        <span className="text-lg">
                            {exercise.caloriesBurned} kcal
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <FaStar className="text-xl" />

                        <span className="text-lg">
                            {exercise.rating}
                        </span>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default ExerciseCard;