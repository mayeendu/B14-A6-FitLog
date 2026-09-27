import React from "react";

import { Exercise } from "@/Types/exercise";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import LibraryContent from "./LibraryContent";


const Library = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  const exercises: Exercise[] =
    await response.json();

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

      {/* Search + Exercise Grid */}
      <LibraryContent exercises={exercises} />
    </section>
  );
};

export default Library;