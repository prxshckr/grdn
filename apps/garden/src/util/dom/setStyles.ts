export const setStyles = (styles: Record<string, string>, child: HTMLElement) => (
  Object.entries(styles).forEach(([key, value]) => {
    child.style[key as any] = value
  })
)
