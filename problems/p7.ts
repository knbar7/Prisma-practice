import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const moviesWithRatings = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    moviesWithRatings.reduce((acc, el) => acc + el.score, 0) /
    moviesWithRatings.length
  );
};
