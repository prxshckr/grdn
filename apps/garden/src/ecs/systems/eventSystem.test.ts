import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { eventSystem } from './eventSystem'

test('stores a loaded sprite and disposes the image it replaces', () => {
	const world = createWorld()
	let previousImageClosed = false
	const previousImage = {
		close: () => {
			previousImageClosed = true
		},
	} as ImageBitmap
	const image = {} as ImageBitmap

	world.assets.spriteAssets.set('/assets/dino.json', {
		spriteSheet: { image: '/assets/old.png', width: 32, height: 32 },
		image: previousImage,
	})
	world.events.push({
		type: 'spriteLoaded',
		url: '/assets/dino.json',
		spriteSheet: { image: '/assets/dino.png', width: 32, height: 32 },
		image,
	})

	eventSystem(world)

	expect(previousImageClosed).toBe(true)
	expect(world.assets.spriteAssets.get('/assets/dino.json')).toEqual({
		spriteSheet: { image: '/assets/dino.png', width: 32, height: 32 },
		image,
	})
	expect(world.events).toEqual([])
})
