import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { keyboardInputSystem } from './keyboardInputSystem'

test('tracks pressed keys and clears justPressed on the next update', () => {
	const world = createWorld()
	world.input.keyboard.events.push({ type: 'keyDown', code: 'ArrowLeft' })

	keyboardInputSystem(world)

	expect(world.input.keyboard.pressed).toEqual(new Set(['ArrowLeft']))
	expect(world.input.keyboard.justPressed).toEqual(new Set(['ArrowLeft']))

	keyboardInputSystem(world)

	expect(world.input.keyboard.pressed).toEqual(new Set(['ArrowLeft']))
	expect(world.input.keyboard.justPressed).toEqual(new Set())
})

test('releases every pressed key when the window loses focus', () => {
	const world = createWorld()
	world.input.keyboard.pressed.add('ArrowLeft')
	world.input.keyboard.pressed.add('ArrowRight')
	world.input.keyboard.events.push({ type: 'blur' })

	keyboardInputSystem(world)

	expect(world.input.keyboard.pressed).toEqual(new Set())
	expect(world.input.keyboard.justReleased).toEqual(
		new Set(['ArrowLeft', 'ArrowRight']),
	)
})
