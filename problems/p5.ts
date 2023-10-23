// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
import { prisma } from "./prisma";

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  // Fetch all movies with their associated star ratings
  const moviesWithRatings = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  // Calculate the average star rating for each movie
  const moviesWithAverageRatings = moviesWithRatings.map((movie) => {
    const ratings = movie.starRatings.map((rating) => rating.score);
    const averageRating =
      ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    return { movieId: movie.id, averageRating };
  });

  // Filter movies with an average rating greater than n
  const filteredMovies = moviesWithAverageRatings.filter(
    (movie) => movie.averageRating > n,
  );

  // Fetch and return movie details for the filtered movies
  const filteredMovieDetails = await prisma.movie.findMany({
    where: {
      id: {
        in: filteredMovies.map((movie) => movie.movieId),
      },
    },
  });

  return filteredMovieDetails;
};
