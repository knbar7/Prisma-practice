import { prisma } from "./prisma";

export const findAllMoviesThatAUserWatched = async (userId: number) => {
  // Fetch all movies with their associated star ratings
  const moviesWithRatings = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  // Filter movies with star ratings matching the specified userId
  const userFilteredMovies = moviesWithRatings.filter((movie) =>
    movie.starRatings.some((rating) => rating.userId === userId),
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
};
