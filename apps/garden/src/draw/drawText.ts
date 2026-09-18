import type { CanvasCtx } from '@garden/canvas-ctx'
import { type DrawCharOptions, drawChar } from './drawChar'

export type DrawTextOptions = {
	size: [number, number]
	charBitMaps: number[][]
	direction?: 'ltr' | 'rtl'
} & Omit<DrawCharOptions, 'charBitMap'>

export const drawText = (
	ctx: CanvasCtx,
	{
		pos: [posX, posY] = [0, 0],
		direction = 'ltr',
		scale = 1,
		size: [sizeX, sizeY],
		color,
		charBitMaps,
	}: DrawTextOptions,
) => {
	const advance = direction === 'ltr' ? sizeX : -sizeX

	for (const [index, charBitMap] of charBitMaps.entries()) {
		drawChar(ctx, {
			pos: [posX + index * (advance + 1) * scale, posY],
			size: [sizeX, sizeY],
			color,
			charBitMap,
			scale,
		})
	}
}
