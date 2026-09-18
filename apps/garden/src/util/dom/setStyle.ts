export const setStyle = (key: string, value: string, child: HTMLElement) => (
  child.style[key as any] = value
)