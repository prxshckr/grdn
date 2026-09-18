import type { CanvasCtx } from '@garden/canvas-ctx'
import { type DrawTextOptions, drawText } from './drawText'

export type DrawParaOptions = {
	charBitMaps: number[][][]
} & Omit<DrawTextOptions, 'charBitMaps'>

export const drawPara = (
	ctx: CanvasCtx,
	{
		pos: [posX, posY] = [0, 0],
		scale = 1,
		size: [sizeX, sizeY],
		charBitMaps,
		...options
	}: DrawParaOptions,
) => {
	for (const [index, lineBitMaps] of charBitMaps.entries()) {
		drawText(ctx, {
			pos: [posX, posY + index * 2 * sizeY * scale],
			scale,
			size: [sizeX, sizeY],
			charBitMaps: lineBitMaps,
			...options,
		})
	}
}
