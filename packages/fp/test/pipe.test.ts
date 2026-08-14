import { describe, expect, test } from "bun:test";
import { pipe } from "../src/pipe";

describe("pipe", () => {
  test("returns the initial value when no functions are provided", () => {
    expect(pipe({ score: 10 })).toEqual({ score: 10 });
  });

  test("applies functions from left to right", () => {
    const result = pipe(
      2,
      (value) => value * 10,
      (value) => `Score: ${value}`,
    );

    expect(result).toBe("Score: 20");
  });

  test("supports a 16-function pipeline", () => {
    const result = pipe(
      0,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
      (value) => value + 1,
    );

    expect(result).toBe(16);
  });
});
