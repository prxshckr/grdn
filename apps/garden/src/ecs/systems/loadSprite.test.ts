import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { eventSystem } from './eventSystem'
import { loadSpriteSystem } from './loadSpriteSystem'

test('loads a sprite sheet and its image into a spriteLoaded event', async () => {
	const world = createWorld()
	const image = {} as ImageBitmap
	const originalFetch = globalThis.fetch
	const originalCreateImageBitmap = globalThis.createImageBitmap

	globalThis.fetch = (async (url) => {
		if (url === '/assets/dino.json') {
			return Response.json({ image: '/assets/dino.png', width: 32, height: 32 })
		}

		return new Response(new Blob(['image']))
	}) as typeof fetch
	globalThis.createImageBitmap = (async () => image) as typeof createImageBitmap

	try {
		world.spriteLoadRequests.add('/assets/dino.json')
		await loadSpriteSystem(world)
	} finally {
		globalThis.fetch = originalFetch
		globalThis.createImageBitmap = originalCreateImageBitmap
	}

	expect(world.events).toEqual([
		{
			type: 'spriteLoaded',
			url: '/assets/dino.json',
			spriteSheet: { image: '/assets/dino.png', width: 32, height: 32 },
			image,
		},
	])
})

test('does not request a sprite sheet that is already loaded', async () => {
	const world = createWorld()
	const image = {} as ImageBitmap
	const originalFetch = globalThis.fetch
	const originalCreateImageBitmap = globalThis.createImageBitmap
	let requests = 0

	globalThis.fetch = (async (url) => {
		requests++
		if (url === '/assets/dino.json') {
			return Response.json({ image: '/assets/dino.png', width: 32, height: 32 })
		}

		return new Response(new Blob(['image']))
	}) as typeof fetch
	globalThis.createImageBitmap = (async () => image) as typeof createImageBitmap

	try {
		world.spriteLoadRequests.add('/assets/dino.json')
		await loadSpriteSystem(world)
		eventSystem(world)
		world.spriteLoadRequests.add('/assets/dino.json')
		await loadSpriteSystem(world)
	} finally {
		globalThis.fetch = originalFetch
		globalThis.createImageBitmap = originalCreateImageBitmap
	}

	expect(requests).toBe(2)
})

test('reuses an in-flight image request across sprite sheets', async () => {
	const world = createWorld()
	const image = {} as ImageBitmap
	const originalFetch = globalThis.fetch
	const originalCreateImageBitmap = globalThis.createImageBitmap
	let imageRequests = 0

	globalThis.fetch = (async (url) => {
		if (url === '/assets/shared.png') {
			imageRequests++
			return new Response(new Blob(['image']))
		}

		return Response.json({
			image: '/assets/shared.png',
			width: 32,
			height: 32,
		})
	}) as typeof fetch
	globalThis.createImageBitmap = (async () => image) as typeof createImageBitmap

	try {
		world.spriteLoadRequests.add('/assets/dino.json')
		world.spriteLoadRequests.add('/assets/clouds.json')
		await loadSpriteSystem(world)
	} finally {
		globalThis.fetch = originalFetch
		globalThis.createImageBitmap = originalCreateImageBitmap
	}

	expect(imageRequests).toBe(1)
})
