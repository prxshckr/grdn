import { describe, expect, test } from "bun:test";
import { pipeAsync } from "../src/pipe-async";

describe("pipeAsync", () => {
  test("resolves the initial value when no functions are provided", async () => {
    await expect(pipeAsync({ score: 10 })).resolves.toEqual({ score: 10 });
  });

  test("awaits asynchronous steps and passes their resolved values forward", async () => {
    const result = await pipeAsync(
      2,
      async (value) => value * 10,
      (value) => `Score: ${value}`,
    );

    expect(result).toBe("Score: 20");
  });

  test("preserves the order of mixed synchronous and asynchronous steps", async () => {
    const executionOrder: string[] = [];

    const result = await pipeAsync(
      "seed",
      (value) => {
        executionOrder.push("plant");
        return `${value}-planted`;
      },
      async (value) => {
        executionOrder.push("water");
        return `${value}-watered`;
      },
      (value) => {
        executionOrder.push("grow");
        return `${value}-grown`;
      },
    );

    expect(executionOrder).toEqual(["plant", "water", "grow"]);
    expect(result).toBe("seed-planted-watered-grown");
  });
});
