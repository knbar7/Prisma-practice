import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  try {
    const moviesWithRatings = await prisma.starRating.findMany({
      where: {
        userId: userId,
      },
    });

    return (
      moviesWithRatings.reduce((acc, el) => acc + el.score, 0) /
      moviesWithRatings.length
    );
  } catch (error) {
    throw new Error(`Error fetching average scores: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
