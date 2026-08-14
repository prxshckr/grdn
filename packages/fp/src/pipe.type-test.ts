import { pipe } from "./pipe";

// Compile-time coverage for the maximum supported pipe length.
const sixteenStepResult: number = pipe(
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

void sixteenStepResult;
