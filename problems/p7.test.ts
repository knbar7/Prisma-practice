/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { getAverageScoreForUser } from "./p7";
import { pipe } from "remeda";
import { averageBy } from "../utils";

describe("p7", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("getAverageScoreForUser should be a function", () => {
    expect(getAverageScoreForUser).toBeInstanceOf(Function);
  });

  it("should return a number for a user that exists", async () => {
    const {
      users: { peter },
    } = await seedFixtures();

    const actual = await getAverageScoreForUser(peter.id);

    expect(typeof actual).toEqual("number");
  });

  it("should get the average score for peter", async () => {
    const {
      users: { peter },
      petersRatings,
    } = await seedFixtures();

    const expected = pipe(
      petersRatings,
      averageBy((n) => n.score),
      (n) => n.toPrecision(5),
    );

    const actual = await pipe(
      await getAverageScoreForUser(peter.id),
      (n) => n && n.toPrecision(5),
    );

    expect(actual).toEqual(expected);
  });

  it("should get the average score for rachel", async () => {
    const {
      users: { rachel },
      rachelsRatings,
    } = await seedFixtures();

    const expected = pipe(
      rachelsRatings,
      averageBy((n) => n.score),
      (n) => n.toPrecision(5),
    );

    const actual = await pipe(
      await getAverageScoreForUser(rachel.id),
      (n) => n && n.toPrecision(5),
    );

    expect(actual).toEqual(expected);
  });
});
