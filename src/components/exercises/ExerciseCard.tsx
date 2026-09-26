import { Exercise } from "@/Types/exercise";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock, FaFire, FaStar } from "react-icons/fa";

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link href={`/exercises/${exercise.id}`}>
      <article className="overflow-hidden rounded-[28px] border border-[#2d3038] bg-[#16171c] text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#baff00]">
        {/* Exercise Image */}
        <div className="h-48 w-full overflow-hidden">
          <Image
            src={exercise.image}
            alt={exercise.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Card Content */}
        <div className="px-4 py-4">
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-3">
            {exercise.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-brand-secondary px-3 py-1 font-inter text-sm font-semibold uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Exercise Name */}
          <h3 className="mt-5 text-[1.3rem] font-oswald font-medium uppercase leading-none tracking-wide">
            {exercise.name}
          </h3>

          {/* Equipment */}
          <p className="mt-2 text-md text-[#a3a7b5]">{exercise.equipment}</p>

          {/* Divider */}
          <div className="my-4 h-px bg-[#30323a]" />

          {/* Exercise Stats */}
          <div className="flex items-left gap-6 text-[#a3a7b5]">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <FaRegClock className="text-base" />

              <span className="text-sm">{exercise.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <FaFire className="text-base" />

              <span className="text-sm">{exercise.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <FaStar className="text-base" />

              <span className="text-sm">{exercise.rating}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ExerciseCard;
