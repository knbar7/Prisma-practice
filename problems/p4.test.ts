import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { filter, map, pipe, reverse, sortBy } from "remeda";
import { getAllPG13Movies } from "./p4";
import { Movie } from "@prisma/client";
import { z } from "zod";

describe("p4", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("getAllPG13Movies should be a function", () => {
    expect(getAllPG13Movies).toBeInstanceOf(Function);
  });

  it("should return only the releaseYear and parentalRating for each movie found", async () => {
    await seedFixtures();
    const pg13Movies = await getAllPG13Movies();
    const schema = z.array(
      z
        .object({
          releaseYear: z.number(),
          parentalRating: z.string(),
        })
        .strict()
    );

    const isValidShape = await schema
      .parseAsync(pg13Movies)
      .then(() => true)
      .catch(() => false);

    expect(isValidShape).toBe(true);
  });

  it("should return all PG-13 movies", async () => {
    const { allMovies } = await seedFixtures();
    const allPG13MoviesFromSeed = pipe(
      allMovies,
      (allMovies) => Object.values(allMovies) as Movie[],
      map(({ releaseYear, parentalRating }) => ({
        parentalRating,
        releaseYear,
      })),
      filter((movie) => movie.parentalRating === "PG-13"),
      sortBy((movie) => movie.releaseYear)
    );
      console.log(allPG13MoviesFromSeed)
    const allPG13Movies = pipe(
      await getAllPG13Movies(),
      sortBy((movie) => movie.releaseYear)
    );
    expect(allPG13Movies).toEqual(allPG13MoviesFromSeed);
  });

  it("should order them by release year from greatest to least", async () => {
    const { allMovies } = await seedFixtures();
    const allPG13MoviesFromSeed = pipe(
      allMovies,
      (allMovies) => Object.values(allMovies) as Movie[],
      filter((movie) => movie.parentalRating === "PG-13"),
      sortBy((movie) => movie.releaseYear),
      map(({ releaseYear, parentalRating }) => ({
        parentalRating,
        releaseYear,
      })),
      reverse
    );

    const allPG13Movies = await getAllPG13Movies();
    expect(allPG13Movies).toEqual(allPG13MoviesFromSeed);
  });
});
