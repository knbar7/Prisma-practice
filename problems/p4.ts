import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = async () => {
  return prisma.movie
    .findMany({
      where: {
        parentalRating: {
          equals: "PG-13",
        },
      },
      orderBy: {
        releaseYear: "desc",
      },
      select: {
        releaseYear: true,
        parentalRating: true,
      },
    })
    .catch((error) => {
      throw new Error(`Could not get movies: ${error}`);
    });
};
