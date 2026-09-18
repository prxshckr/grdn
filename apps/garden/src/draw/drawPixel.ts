import type { CanvasCtx } from '@garden/canvas-ctx'

export type DrawPixelOptions = {
	pos?: Pos2D
	scale?: number
	color?: string
}

export const drawPixel = (
	ctx: CanvasCtx,
	{ pos = [0, 0], scale = 1, color }: DrawPixelOptions,
) => {
	ctx.fillRect({ pos, width: scale, height: scale, color })
}
