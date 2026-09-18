import type { CanvasCtx } from '@garden/canvas-ctx'
import { CTX } from './constants/ctx'
import { ELEMENT_GAME_CANVAS } from './constants/elements'
import { POEM } from './constants/poem'
import { SETTINGS } from './constants/ui'
import { drawPara } from './draw/drawPara'
import { drawTreeNode } from './draw/drawTreeNode'
import { getGlyph } from './util/font/english/concrete-5x5'

const init = () => {
	ELEMENT_GAME_CANVAS.setAttributes({
		width: SETTINGS.width,
		height: SETTINGS.height,
	})

	window.addEventListener('resize', resize)
}

const resize = () => {
	const scale = Math.min(
		window.innerWidth / SETTINGS.width,
		window.innerHeight / SETTINGS.height,
	)

	ELEMENT_GAME_CANVAS.setStyles({
		width: `${SETTINGS.width * scale}px`,
		height: `${SETTINGS.height * scale}px`,
	})
}

type DrawPoemCoupletOptions = {
	couplet: string[]
	pos?: Pos2D
}

const drawPoemCouplet = (
	ctx: CanvasCtx,
	{ couplet, pos: [x, y] = [0, 0] }: DrawPoemCoupletOptions,
) => {
	drawPara(ctx, {
		pos: [x * 3, y * 3],
		size: [5, 5],
		charBitMaps: couplet.map((line) =>
			line
				.toUpperCase()
				.split('')
				.map((char) => getGlyph(char)),
		),
		color: 'crimson',
		scale: 3,
	})
}

const draw = () => {
	CTX.fillRect({
		width: SETTINGS.width,
		height: SETTINGS.height,
		color: 'black',
	})

	CTX.save().translate([100, 100])

	drawPoemCouplet(CTX, {
		couplet: POEM[0][0],
		pos: [0, 0],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][1],
		pos: [0, 30],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][2],
		pos: [0, 60],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][3],
		pos: [0, 90],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][4],
		pos: [0, 120],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][5],
		pos: [0, 150],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[0][6],
		pos: [0, 180],
	})

	drawPoemCouplet(CTX, {
		couplet: POEM[1][0],
		pos: [200, 0],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[1][1],
		pos: [200, 30],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[1][2],
		pos: [200, 60],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[1][3],
		pos: [200, 90],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[1][4],
		pos: [200, 120],
	})

	drawPoemCouplet(CTX, {
		couplet: POEM[2][0],
		pos: [400, 0],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[2][1],
		pos: [400, 30],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[2][2],
		pos: [400, 60],
	})

	drawPoemCouplet(CTX, {
		couplet: POEM[3][0],
		pos: [600, 0],
	})
	drawPoemCouplet(CTX, {
		couplet: POEM[3][1],
		pos: [600, 30],
	})

	CTX.restore()

	CTX.translate([0, SETTINGS.height - 10])
		.fillRect({
			pos: [0, 0],
			width: SETTINGS.width,
			height: 10,
			color: 'darkgreen',
		})
		.scale([1, -1])

	const gens = 8
	const offset = SETTINGS.width / (gens + 1)

	for (let gen = 1; gen < gens + 1; gen++) {
		CTX.save().translate([offset * gen, 0])

		drawTreeNode(CTX, { gen })

		CTX.restore()
	}
}

init()
resize()
draw()
