export type Point = readonly [number, number]

export type ArcOptions = {
	pos?: Point
	radius?: number
	startAngle?: number
	endAngle?: number
	counterClockwise?: boolean
}

export type FillOptions = {
	color?: string
}

export type StrokeOptions = {
	color?: string
}

export type FillRectOptions = {
	pos?: Point
	width?: number
	height?: number
	color?: string
}

export type RotateOptions = {
	angle?: number
}

export type ScaleOptions = {
	x?: number
	y?: number
}

export type ArcToOptions = {
	control1?: Point
	control2?: Point
	radius?: number
}

export type BezierCurveToOptions = {
	control1?: Point
	control2?: Point
	pos?: Point
}

export type ClipOptions = {
	path?: Path2D
	fillRule?: CanvasFillRule
}

export type DrawImageOptions = {
	image: CanvasImageSource
	pos?: Point
	width?: number
	height?: number
	source?: {
		pos?: Point
		width: number
		height: number
	}
}

export type EllipseOptions = {
	pos?: Point
	radiusX?: number
	radiusY?: number
	rotation?: number
	startAngle?: number
	endAngle?: number
	counterClockwise?: boolean
}

export type LineToOptions = {
	width?: number
	cap?: CanvasLineCap
	dashOffset?: number
}

export type TextOptions = {
	text: string
	pos?: Point
	maxWidth?: number
}

export type QuadraticCurveToOptions = {
	control?: Point
	pos?: Point
}

export type RoundRectOptions = FillRectOptions & {
	radii?: number | DOMPointInit | (number | DOMPointInit)[]
}

export class CanvasCtx {
	#ctx: CanvasRenderingContext2D

	constructor(ctx: CanvasRenderingContext2D) {
		this.#ctx = ctx
	}

	get context() {
		return this.#ctx
	}

	arc({
		pos: [x, y] = [0, 0],
		radius = 1,
		startAngle = 0,
		endAngle = Math.PI * 2,
		counterClockwise = false,
	}: ArcOptions = {}) {
		this.#ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise)
		return this
	}

	arcTo({
		control1: [x1, y1] = [0, 0],
		control2: [x2, y2] = [0, 0],
		radius = 1,
	}: ArcToOptions = {}) {
		this.#ctx.arcTo(x1, y1, x2, y2, radius)
		return this
	}

	beginPath() {
		this.#ctx.beginPath()
		return this
	}

	bezierCurveTo({
		control1: [x1, y1] = [0, 0],
		control2: [x2, y2] = [0, 0],
		pos: [x, y] = [0, 0],
	}: BezierCurveToOptions = {}) {
		this.#ctx.bezierCurveTo(x1, y1, x2, y2, x, y)
		return this
	}

	closePath() {
		this.#ctx.closePath()
		return this
	}

	clearRect(options: FillRectOptions = {}) {
		const { pos: [x, y] = [0, 0], width = 1, height = 1 } = options
		this.#ctx.clearRect(x, y, width, height)
		return this
	}

	clip({ path, fillRule = 'nonzero' }: ClipOptions = {}) {
		if (path) {
			this.#ctx.clip(path, fillRule)
		} else {
			this.#ctx.clip(fillRule)
		}

		return this
	}

	drawImage({
		image,
		pos: [x, y] = [0, 0],
		width,
		height,
		source,
	}: DrawImageOptions) {
		if (source) {
			const {
				pos: [sourceX, sourceY] = [0, 0],
				width: sourceWidth,
				height: sourceHeight,
			} = source
			this.#ctx.drawImage(
				image,
				sourceX,
				sourceY,
				sourceWidth,
				sourceHeight,
				x,
				y,
				width ?? sourceWidth,
				height ?? sourceHeight,
			)
		} else if (width !== undefined || height !== undefined) {
			this.#ctx.drawImage(image, x, y, width ?? 1, height ?? 1)
		} else {
			this.#ctx.drawImage(image, x, y)
		}

		return this
	}

	ellipse({
		pos: [x, y] = [0, 0],
		radiusX = 1,
		radiusY = 1,
		rotation = 0,
		startAngle = 0,
		endAngle = Math.PI * 2,
		counterClockwise = false,
	}: EllipseOptions = {}) {
		this.#ctx.ellipse(
			x,
			y,
			radiusX,
			radiusY,
			rotation,
			startAngle,
			endAngle,
			counterClockwise,
		)
		return this
	}

	fill(color?: string) {
		if (color) this.fillStyle(color)

		this.#ctx.fill()
		return this
	}

	fillText({ text, pos: [x, y] = [0, 0], maxWidth }: TextOptions) {
		if (maxWidth === undefined) {
			this.#ctx.fillText(text, x, y)
		} else {
			this.#ctx.fillText(text, x, y, maxWidth)
		}

		return this
	}

	fillRect({
		pos: [x, y] = [0, 0],
		width = 1,
		height = 1,
		color,
	}: FillRectOptions = {}) {
		if (color) this.fillStyle(color)

		this.#ctx.fillRect(x, y, width, height)
		return this
	}

	fillStyle(color: string = '#000000') {
		this.#ctx.fillStyle = color
		return this
	}

	lineTo(
		[x, y]: Point = [0, 0],
		{ width = 1, cap, dashOffset }: LineToOptions = {},
	) {
		if (cap) this.#ctx.lineCap = cap
		if (dashOffset) this.#ctx.lineDashOffset = dashOffset
		if (width) this.#ctx.lineWidth = width

		this.#ctx.lineTo(x, y)
		return this
	}

	moveTo([x, y]: Point = [0, 0]) {
		this.#ctx.moveTo(x, y)
		return this
	}

	quadraticCurveTo({
		control: [controlX, controlY] = [0, 0],
		pos: [x, y] = [0, 0],
	}: QuadraticCurveToOptions = {}) {
		this.#ctx.quadraticCurveTo(controlX, controlY, x, y)
		return this
	}

	rect(options: FillRectOptions = {}) {
		const { pos: [x, y] = [0, 0], width = 1, height = 1 } = options
		this.#ctx.rect(x, y, width, height)
		return this
	}

	restore() {
		this.#ctx.restore()
		return this
	}

	rotate(angle: number = 0) {
		this.#ctx.rotate(angle)
		return this
	}

	roundRect(options: RoundRectOptions = {}) {
		const { pos: [x, y] = [0, 0], width = 1, height = 1, radii = 0 } = options
		this.#ctx.roundRect(x, y, width, height, radii)
		return this
	}

	save() {
		this.#ctx.save()
		return this
	}

	scale([x, y]: readonly [number, number] = [1, 1]) {
		this.#ctx.scale(x, y)
		return this
	}

	stroke(color?: string) {
		if (color) this.strokeStyle(color)

		this.#ctx.stroke()
		return this
	}

	strokeRect(options: FillRectOptions = {}) {
		const { pos: [x, y] = [0, 0], width = 1, height = 1 } = options
		this.#ctx.strokeRect(x, y, width, height)
		return this
	}

	strokeStyle(color: string = '#000000') {
		this.#ctx.strokeStyle = color
		return this
	}

	strokeText({ text, pos: [x, y] = [0, 0], maxWidth }: TextOptions) {
		if (maxWidth === undefined) {
			this.#ctx.strokeText(text, x, y)
		} else {
			this.#ctx.strokeText(text, x, y, maxWidth)
		}

		return this
	}

	translate([x, y]: Point) {
		this.#ctx.translate(x, y)
		return this
	}
}
