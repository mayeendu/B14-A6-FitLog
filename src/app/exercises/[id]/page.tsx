interface ExerciseDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const ExerciseDetailsPage = async ({
    params,
}: ExerciseDetailsPageProps) => {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-[#16171c] px-6 py-20 text-white">
            <h1 className="text-4xl font-bold">
                Exercise ID: {id}
            </h1>
        </main>
    );
};

export default ExerciseDetailsPage;