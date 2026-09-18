import type { CanvasCtx } from '@garden/canvas-ctx'

export type DrawTreeNodeOptions = {
	gen?: number
	bloomRadius?: number
	segmentLength?: number
	nodePlacement?: number
	nodeRotation?: number
	lineWidth?: number
	colorStem?: string
	colorBloom?: string
}

export const drawTreeNode = (
	ctx: CanvasCtx,
	{
		gen = 1,
		segmentLength = 11,
		nodePlacement = 0.5,
		nodeRotation = (Math.PI / 180) * 22,
		bloomRadius = 4,
		lineWidth = 4,
		colorStem = 'darkgreen',
		colorBloom = 'crimson',
	}: DrawTreeNodeOptions,
) => {
	const length = gen * segmentLength
	ctx
		.save()
		.beginPath()
		.moveTo([0, 0])
		.lineTo([0, length], { width: gen })
		.closePath()
		.stroke(colorStem)
		.restore()

	for (let i = gen - 1; i >= 1; i--) {
		ctx
			.save()
			.translate([0, length * nodePlacement])
			.rotate(nodeRotation)

		drawTreeNode(ctx, {
			segmentLength,
			nodePlacement,
			nodeRotation,
			lineWidth,
			colorStem,
			gen: gen - 1,
		})

		ctx.restore()

		ctx.save().translate([0, length]).scale([-1, 1])

		drawTreeNode(ctx, {
			segmentLength,
			nodePlacement,
			nodeRotation,
			lineWidth,
			colorStem,
			gen: gen - 1,
		})

		ctx.restore()
	}

	if (gen === 1) {
		ctx
			.save()
			.translate([0, length])
			.beginPath()
			.arc({ pos: [0, 0], radius: bloomRadius })
			.closePath()
			.fill(colorBloom)
			.restore()
	}
}
