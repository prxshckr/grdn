import type { TouchPoint, World } from '../types'

const getPosition = (touch: Touch, canvas: HTMLCanvasElement): Pos2D => {
	const bounds = canvas.getBoundingClientRect()

	return [
		(touch.clientX - bounds.left) * (canvas.width / bounds.width),
		(touch.clientY - bounds.top) * (canvas.height / bounds.height),
	]
}

const getTouchPoints = (touches: TouchList, canvas: HTMLCanvasElement) =>
	Array.from(
		touches,
		(touch): TouchPoint => ({
			id: touch.identifier,
			position: getPosition(touch, canvas),
		}),
	)

export const attachTouchInput = (world: World, canvas: HTMLCanvasElement) => {
	const listen = (
		type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
		eventType: 'start' | 'move' | 'end',
	) => {
		canvas.addEventListener(
			type,
			(event) => {
				event.preventDefault()
				world.input.touch.events.push({
					type: eventType,
					touches: getTouchPoints(event.changedTouches, canvas),
				})
			},
			{ passive: false },
		)
	}

	listen('touchstart', 'start')
	listen('touchmove', 'move')
	listen('touchend', 'end')
	listen('touchcancel', 'end')

	window.addEventListener('blur', () => {
		world.input.touch.events.push({ type: 'blur' })
	})
}

export const touchInputSystem = (world: World) => {
	const { touch } = world.input
	touch.justStarted.clear()
	touch.justEnded.clear()

	const events = touch.events.splice(0)

	for (const event of events) {
		switch (event.type) {
			case 'start': {
				for (const point of event.touches) {
					touch.active.set(point.id, point.position)
					touch.justStarted.add(point.id)
				}
				break
			}
			case 'move': {
				for (const point of event.touches) {
					if (touch.active.has(point.id)) {
						touch.active.set(point.id, point.position)
					}
				}
				break
			}
			case 'end': {
				for (const point of event.touches) {
					if (touch.active.delete(point.id)) {
						touch.justEnded.add(point.id)
					}
				}
				break
			}
			case 'blur': {
				for (const id of touch.active.keys()) {
					touch.justEnded.add(id)
				}
				touch.active.clear()
				break
			}
		}
	}
}
