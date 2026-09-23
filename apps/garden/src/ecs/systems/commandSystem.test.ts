import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { update } from '../update'
import { commandSystem } from './commandSystem'

test('spawns an entity', () => {
	const world = createWorld()

	world.commands.push({
		type: 'spawn',
	})

	commandSystem(world)

	expect(world.entities).toEqual(new Set([0]))
	expect(world.nextEntity).toBe(1)
	expect(world.commands).toEqual([])
})

test('spawns a positioned sprite and requests its sprite sheet', () => {
	const world = createWorld()

	world.commands.push({
		type: 'spawnSprite',
		url: '/assets/clouds.json',
		position: [0, 196],
	})

	commandSystem(world)

	expect(world.entities).toEqual(new Set([0]))
	expect(world.components.sprites.get(0)).toBe('/assets/clouds.json')
	expect(world.components.positions.get(0)).toEqual([0, 196])
	expect(world.spriteLoadRequests).toEqual(new Set(['/assets/clouds.json']))
})

test('processes spawn commands during an update', () => {
	const world = createWorld()

	world.commands.push({
		type: 'spawn',
	})

	update(world, 0)

	expect(world.entities).toEqual(new Set([0]))
})
