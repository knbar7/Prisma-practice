import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

export const findAllMoviesThatAUserWatched = async (userId: number) => {
    try {
        // Fetch all movies with their associated star ratings
        const moviesWithRatings = await prisma.movie.findMany({
            include: {
                starRatings: true,
            },
        });

        // Filter movies with star ratings matching the specified userId
        const userFilteredMovies = moviesWithRatings.filter((movie) =>
            movie.starRatings.some((rating) => rating.userId === userId)
        );

        // Map the filtered movies to the desired format
        const formattedMovies = userFilteredMovies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            releaseYear: movie.releaseYear,
            parentalRating: movie.parentalRating,
            // You can include more properties from the movie object as needed
        }));

        return formattedMovies;
    } catch (error) {
        throw new Error(`Error fetching movies: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
};
