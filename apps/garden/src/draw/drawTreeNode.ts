import type { CanvasCtx } from '@garden/canvas-ctx'

export type DrawTreeNodeOptions = {
	gen?: number
	progress?: number
	bloomRadius?: number
	segmentLength?: number
	nodePlacement?: number
	nodeRotation?: number
	lineWidth?: number
	colorStem?: string
	colorBloom?: string
}

type DrawTreeNodeConfig = Required<Omit<DrawTreeNodeOptions, 'progress'>>

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max)

const getNodeCount = (gen: number) => {
	let nodeCount = 1

	for (let currentGen = 2; currentGen <= gen; currentGen++) {
		nodeCount = 1 + 2 * nodeCount
	}

	return nodeCount
}

const drawTreeNodeRecursive = (
	ctx: CanvasCtx,
	{
		gen,
		bloomRadius,
		segmentLength,
		nodePlacement,
		nodeRotation,
		lineWidth,
		colorStem,
		colorBloom,
	}: DrawTreeNodeConfig,
	nodeBudget: number,
	nodeCount: number,
) => {
	if (nodeBudget <= 0) return

	const length = gen * segmentLength
	const stemProgress = Math.min(nodeBudget, 1)
	ctx
		.save()
		.beginPath()
		.moveTo([0, 0])
		.lineTo([0, length * stemProgress], { width: gen })
		.closePath()
		.stroke(colorStem)
		.restore()

	if (nodeBudget < 1) return

	if (gen === 1) {
		ctx
			.save()
			.translate([0, length])
			.beginPath()
			.arc({ pos: [0, 0], radius: bloomRadius })
			.closePath()
			.fill(colorBloom)
			.restore()

		return
	}

	const childNodeCount = (nodeCount - 1) / 2
	let remainingBudget = nodeBudget - 1
	const options = {
		gen: gen - 1,
		bloomRadius,
		segmentLength,
		nodePlacement,
		nodeRotation,
		lineWidth,
		colorStem,
		colorBloom,
	}

	let childBudget = Math.min(remainingBudget, childNodeCount)

	if (childBudget <= 0) return

	ctx
		.save()
		.translate([0, length * nodePlacement])
		.rotate(nodeRotation)
	drawTreeNodeRecursive(ctx, options, childBudget, childNodeCount)
	ctx.restore()

	remainingBudget -= childNodeCount
	childBudget = Math.min(remainingBudget, childNodeCount)

	if (childBudget <= 0) return

	ctx.save().translate([0, length]).scale([-1, 1])
	drawTreeNodeRecursive(ctx, options, childBudget, childNodeCount)
	ctx.restore()
}

export const drawTreeNode = (
	ctx: CanvasCtx,
	{
		gen = 1,
		progress = 1,
		segmentLength = 11,
		nodePlacement = 0.5,
		nodeRotation = (Math.PI / 180) * 22,
		bloomRadius = 4,
		lineWidth = 4,
		colorStem = 'darkgreen',
		colorBloom = 'crimson',
	}: DrawTreeNodeOptions,
) => {
	const nodeCount = getNodeCount(gen)

	drawTreeNodeRecursive(
		ctx,
		{
			gen,
			bloomRadius,
			segmentLength,
			nodePlacement,
			nodeRotation,
			lineWidth,
			colorStem,
			colorBloom,
		},
		clamp(progress, 0, 1) * nodeCount,
		nodeCount,
	)
}
