import type { World } from '../types'

export const attachKeyboardInput = (world: World) => {
	window.addEventListener('keydown', (event) => {
		world.input.keyboard.events.push({ type: 'keyDown', code: event.code })
	})

	window.addEventListener('keyup', (event) => {
		world.input.keyboard.events.push({ type: 'keyUp', code: event.code })
	})

	window.addEventListener('blur', () => {
		world.input.keyboard.events.push({ type: 'blur' })
	})
}

export const keyboardInputSystem = (world: World) => {
	const { keyboard } = world.input
	keyboard.justPressed.clear()
	keyboard.justReleased.clear()

	const events = keyboard.events.splice(0)

	for (const event of events) {
		switch (event.type) {
			case 'keyDown': {
				if (!keyboard.pressed.has(event.code)) {
					keyboard.pressed.add(event.code)
					keyboard.justPressed.add(event.code)
				}
				break
			}
			case 'keyUp': {
				if (keyboard.pressed.delete(event.code)) {
					keyboard.justReleased.add(event.code)
				}
				break
			}
			case 'blur': {
				for (const code of keyboard.pressed) {
					keyboard.justReleased.add(code)
				}
				keyboard.pressed.clear()
				break
			}
		}
	}
}
