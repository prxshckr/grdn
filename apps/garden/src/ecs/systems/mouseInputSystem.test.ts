import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { mouseInputSystem } from './mouseInputSystem'

test('tracks pointer position and mouse button presses', () => {
	const world = createWorld()
	world.input.mouse.events.push(
		{ type: 'move', position: [40, 50] },
		{ type: 'buttonDown', button: 0, position: [60, 70] },
	)

	mouseInputSystem(world)

	expect(world.input.mouse.position).toEqual([60, 70])
	expect(world.input.mouse.pressed).toEqual(new Set([0]))
	expect(world.input.mouse.justPressed).toEqual(new Set([0]))
})

test('releases every mouse button when the window loses focus', () => {
	const world = createWorld()
	world.input.mouse.pressed.add(0)
	world.input.mouse.pressed.add(2)
	world.input.mouse.events.push({ type: 'blur' })

	mouseInputSystem(world)

	expect(world.input.mouse.pressed).toEqual(new Set())
	expect(world.input.mouse.justReleased).toEqual(new Set([0, 2]))
})
