/**
 * Applies functions from left to right, passing each result to the next
 * function. Its calling convention matches fp-ts's `pipe`.
 */
export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, ab: (value: A) => B): B;
export function pipe<A, B, C>(value: A, ab: (value: A) => B, bc: (value: B) => C): C;
export function pipe<A, B, C, D>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D): D;
export function pipe<A, B, C, D, E>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E): E;
export function pipe<A, B, C, D, E, F>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F): F;
export function pipe<A, B, C, D, E, F, G>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G): G;
export function pipe<A, B, C, D, E, F, G, H>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H): H;
export function pipe<A, B, C, D, E, F, G, H, I>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K): K;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L): L;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L, lm: (value: L) => M): M;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L, lm: (value: L) => M, mn: (value: M) => N): N;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L, lm: (value: L) => M, mn: (value: M) => N, no: (value: N) => O): O;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L, lm: (value: L) => M, mn: (value: M) => N, no: (value: N) => O, op: (value: O) => P): P;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(value: A, ab: (value: A) => B, bc: (value: B) => C, cd: (value: C) => D, de: (value: D) => E, ef: (value: E) => F, fg: (value: F) => G, gh: (value: G) => H, hi: (value: H) => I, ij: (value: I) => J, jk: (value: J) => K, kl: (value: K) => L, lm: (value: L) => M, mn: (value: M) => N, no: (value: N) => O, op: (value: O) => P, pq: (value: P) => Q): Q;
export function pipe(value: any, ...functions: Array<(value: any) => any>): any {
  return functions.reduce((result, fn) => fn(result), value);
}
