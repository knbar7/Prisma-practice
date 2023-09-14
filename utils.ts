import { purry } from "remeda";

export const loggit = <T>(x: T) => {
  console.log(x);
  return x;
};

export const loggitWTag =
  (tag: string) =>
  <T>(x: T) => {
    console.log(`${tag}:`);
    console.log(x);
    return x;
  };

const _averageBy = <T>(arr: T[], fn: (x: T) => number) =>
  arr.reduce((acc, x) => acc + fn(x), 0) / arr.length;

export function averageBy<T>(arr: T[], fn: (x: T) => number): number;
export function averageBy<T>(fn: (x: T) => number): (arr: T[]) => number;
export function averageBy(...args: any[]) {
  // console.log("fuck");
  console.log({ args });
  // eslint-disable-next-line prefer-rest-params
  return purry(_averageBy, args);
}
