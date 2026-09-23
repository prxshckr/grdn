import { expect, test } from 'bun:test'
import { createWorld } from '../createWorld'
import { spriteAnimationSystem } from './spriteAnimationSystem'

test('creates and advances the default sprite-sheet animation', () => {
	const world = createWorld()
	const image = {} as ImageBitmap
	world.entities.add(0)
	world.components.sprites.set(0, '/assets/dino.json')
	world.assets.spriteAssets.set('/assets/dino.json', {
		image,
		spriteSheet: {
			image: '/assets/dino.png',
			width: 32,
			height: 32,
			animations: {
				idle: {
					frames: [
						{ x: 0, y: 0, duration: 125 },
						{ x: 0, y: 32, duration: 125 },
					],
					loop: true,
				},
			},
		},
	})

	spriteAnimationSystem(world, 0.125)

	expect(world.components.spriteAnimations.get(0)).toEqual({
		name: 'idle',
		frameIndex: 1,
		elapsed: 0,
	})
})
