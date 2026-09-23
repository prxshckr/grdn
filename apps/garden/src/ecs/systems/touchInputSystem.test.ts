import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { touchInputSystem } from './touchInputSystem'

test('tracks active touch points and their start transitions', () => {
	const world = createWorld()
	world.input.touch.events.push({
		type: 'start',
		touches: [
			{ id: 1, position: [10, 20] },
			{ id: 2, position: [30, 40] },
		],
	})

	touchInputSystem(world)

	expect(world.input.touch.active).toEqual(
		new Map([
			[1, [10, 20]],
			[2, [30, 40]],
		]),
	)
	expect(world.input.touch.justStarted).toEqual(new Set([1, 2]))
})

test('updates and releases individual touch points', () => {
	const world = createWorld()
	world.input.touch.active.set(1, [10, 20])
	world.input.touch.active.set(2, [30, 40])
	world.input.touch.events.push(
		{ type: 'move', touches: [{ id: 1, position: [15, 25] }] },
		{ type: 'end', touches: [{ id: 2, position: [30, 40] }] },
	)

	touchInputSystem(world)

	expect(world.input.touch.active).toEqual(new Map([[1, [15, 25]]]))
	expect(world.input.touch.justEnded).toEqual(new Set([2]))
})
