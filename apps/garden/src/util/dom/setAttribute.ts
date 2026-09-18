import { NAMESPACES } from "./constants"

export const setAttribute = (child: Element, key: string, value: string, ns = NAMESPACES.HTML) => {
  child.setAttributeNS(ns, key, value)

  return child
}