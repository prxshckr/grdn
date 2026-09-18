import type { CanvasCtx } from '@garden/canvas-ctx'
import { type DrawPixelOptions, drawPixel } from './drawPixel'

export type DrawCharOptions = {
	charBitMap: number[]
	size: [number, number]
} & DrawPixelOptions

export const drawChar = (
	ctx: CanvasCtx,
	{
		pos: [posX, posY] = [0, 0],
		color,
		charBitMap,
		scale = 1,
		size: [sizeX, sizeY],
	}: DrawCharOptions,
) => {
	for (let y = 0; y < sizeY; y++) {
		const bitMap = charBitMap[y]

		for (let x = 0; x < sizeX; x++) {
			const bit = (bitMap >> x) & 1

			if (bit)
				drawPixel(ctx, {
					pos: [posX + (sizeX - 1 - x) * scale, posY + y * scale],
					color,
					scale,
				})
		}
	}
}
