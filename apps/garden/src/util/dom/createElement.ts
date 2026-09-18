import { NAMESPACES } from "./constants";

export const createElement = (tag: string, ns: string = NAMESPACES.HTML) => (
  document.createElementNS(ns, tag)
)