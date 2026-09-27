import React from "react";

import { Exercise } from "@/Types/exercise";
import ExerciseCard from "@/components/exercises/ExerciseCard";

const Library = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  const exercises: Exercise[] = await response.json();

  console.log(exercises);

  return (
    <section
      id="library"
      className="container mx-auto px-4 py-16"
    >
      {/* Library Heading */}
      <div className="mb-10 text-left">
        <h2 className="font-oswald text-4xl font-bold">
          THE LIBRARY
        </h2>

        <p className="mt-3 font-inter text-gray-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </section>
  );
};

export default Library;