/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { getAllMoviesWithAverageScoreOverN } from "./p5";
import { groupBy, map, pipe, reduce, sortBy, sumBy } from "remeda";
import { StarRating } from "@prisma/client";

describe("p4", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("getAllMoviesWithAverageScoreOver3 should be a function", () => {
    expect(getAllMoviesWithAverageScoreOverN).toBeInstanceOf(Function);
  });

  it("Should give me all the movies with an average score over 3", async () => {
    const { allRatings, allMovies } = await seedFixtures();
    const expected = pipe(
      allRatings,
      groupBy((rating) => rating.movieId),
      Object.entries,
      reduce((acc, [_key, starRatings]: [string, StarRating[]]) => {
        const average = sumBy(starRatings, (s) => s.score) / starRatings.length;
        if (average > 3) {
          return [...acc, starRatings[0].movieId];
        }
        return acc;
      }, [] as number[]),
      map((id) => Object.values(allMovies).find((m) => m.id === id)),
      sortBy((movie) => movie!.id)
    );
    const actual = pipe(
      await getAllMoviesWithAverageScoreOverN(3),
      sortBy((movie) => movie.id)
    );
    expect(actual).toEqual(expected);
  });

  it("Should give me all the movies with an average score over 4", async () => {
    const { allRatings, allMovies } = await seedFixtures();
    const expected = pipe(
      allRatings,
      groupBy((rating) => rating.movieId),
      Object.entries,
      reduce((acc, [_key, starRatings]: [string, StarRating[]]) => {
        const average = sumBy(starRatings, (s) => s.score) / starRatings.length;
        if (average > 4) {
          return [...acc, starRatings[0].movieId];
        }
        return acc;
      }, [] as number[]),
      map((id) => Object.values(allMovies).find((m) => m.id === id)),
      sortBy((movie) => movie!.id)
    );

    const actual = pipe(
      await getAllMoviesWithAverageScoreOverN(4),
      sortBy((movie) => movie.id)
    );

    expect(actual).toEqual(expected);
  });
});
