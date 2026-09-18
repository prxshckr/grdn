import type { NAMESPACE } from "./constants";

export type Namespace = typeof NAMESPACE[keyof typeof NAMESPACE]