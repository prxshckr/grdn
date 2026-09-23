export type RenderLoopOptions = {
	update: (deltaTime: number) => void
	render: (deltaTime: number) => void
}

export const renderLoop = ({ update, render }: RenderLoopOptions) => {
	let animationFrame: number | undefined
	let previousTime: number | undefined
	let isRunning = true

	const frame = (time: number) => {
		if (!isRunning) return

		const deltaTime =
			previousTime === undefined
				? 0
				: Math.min((time - previousTime) / 1000, 0.1)

		previousTime = time
		update(deltaTime)
		render(deltaTime)

		if (isRunning) animationFrame = requestAnimationFrame(frame)
	}

	animationFrame = requestAnimationFrame(frame)

	return () => {
		isRunning = false
		if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
	}
}
