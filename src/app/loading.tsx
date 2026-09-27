const Loading = () => {
    return (
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#101114]">
            <div className="flex flex-col items-center">

                {/* Spinner */}
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#2d3038] border-t-[#c2f800]" />

                {/* Loading Text */}
                <p className="mt-5 font-inter text-sm font-medium text-[#9ca3af]">
                    Loading workouts...
                </p>
            </div>
        </main>
    );
};

export default Loading;