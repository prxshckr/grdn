import type { World } from '../types'

const getPosition = (event: PointerEvent, canvas: HTMLCanvasElement): Pos2D => {
	const bounds = canvas.getBoundingClientRect()

	return [
		(event.clientX - bounds.left) * (canvas.width / bounds.width),
		(event.clientY - bounds.top) * (canvas.height / bounds.height),
	]
}

export const attachMouseInput = (world: World, canvas: HTMLCanvasElement) => {
	canvas.addEventListener('pointermove', (event) => {
		if (event.pointerType !== 'mouse') return

		world.input.mouse.events.push({
			type: 'move',
			position: getPosition(event, canvas),
		})
	})

	canvas.addEventListener('pointerdown', (event) => {
		if (event.pointerType !== 'mouse') return

		canvas.setPointerCapture(event.pointerId)
		world.input.mouse.events.push({
			type: 'buttonDown',
			button: event.button,
			position: getPosition(event, canvas),
		})
	})

	canvas.addEventListener('pointerup', (event) => {
		if (event.pointerType !== 'mouse') return

		canvas.releasePointerCapture(event.pointerId)
		world.input.mouse.events.push({
			type: 'buttonUp',
			button: event.button,
			position: getPosition(event, canvas),
		})
	})

	window.addEventListener('blur', () => {
		world.input.mouse.events.push({ type: 'blur' })
	})
}

export const mouseInputSystem = (world: World) => {
	const { mouse } = world.input
	mouse.justPressed.clear()
	mouse.justReleased.clear()

	const events = mouse.events.splice(0)

	for (const event of events) {
		switch (event.type) {
			case 'move': {
				mouse.position = event.position
				break
			}
			case 'buttonDown': {
				mouse.position = event.position
				if (!mouse.pressed.has(event.button)) {
					mouse.pressed.add(event.button)
					mouse.justPressed.add(event.button)
				}
				break
			}
			case 'buttonUp': {
				mouse.position = event.position
				if (mouse.pressed.delete(event.button)) {
					mouse.justReleased.add(event.button)
				}
				break
			}
			case 'blur': {
				for (const button of mouse.pressed) {
					mouse.justReleased.add(button)
				}
				mouse.pressed.clear()
				break
			}
		}
	}
}
