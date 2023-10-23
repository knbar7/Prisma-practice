import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const criticAverage = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });

  const critic = criticAverage.reduce((acc, critic) => {
    if (critic._avg.score === null) {
      return acc;
    }
    if (acc._avg.score === null) {
      return (acc = critic);
    }
    if (critic._avg.score < acc._avg.score) {
      return (acc = critic);
    }
    return acc;
  });

  return critic.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const criticAverage = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });

  const critic = criticAverage.reduce((acc, critic) => {
    if (critic._avg.score === null) {
      return acc;
    }
    if (acc._avg.score === null) {
      return (acc = critic);
    }
    if (critic._avg.score > acc._avg.score) {
      return (acc = critic);
    }
    return acc;
  });

  return critic.userId;
};
