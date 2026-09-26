import { Exercise } from "@/Types/exercise";
import React from "react";
import ExerciseCard from "@/components/exercises/ExerciseCard";

const Library = async () => {
  const response = await fetch("https://api.api-store.workers.dev/api/fitlog");

  const exercises: Exercise[] = await response.json();

  console.log(exercises);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold">THE LIBRARY</h2>

        <p className="mt-3 text-gray-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </section>
  );
};

export default Library;
