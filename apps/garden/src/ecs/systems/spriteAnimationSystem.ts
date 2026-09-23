import type { SpriteAnimation, SpriteAnimationState, World } from '../types'

const advanceAnimation = (
	state: SpriteAnimationState,
	animation: SpriteAnimation,
	deltaTime: number,
) => {
	state.elapsed += deltaTime * 1000

	while (true) {
		const frame = animation.frames[state.frameIndex]
		if (!frame || frame.duration <= 0 || state.elapsed < frame.duration) return

		state.elapsed -= frame.duration
		if (state.frameIndex < animation.frames.length - 1) {
			state.frameIndex++
		} else if (animation.loop) {
			state.frameIndex = 0
		} else {
			state.elapsed = 0
			return
		}
	}
}

export const spriteAnimationSystem = (world: World, deltaTime: number) => {
	for (const entity of world.entities) {
		const spriteUrl = world.components.sprites.get(entity)
		const spriteAsset =
			spriteUrl === undefined
				? undefined
				: world.assets.spriteAssets.get(spriteUrl)
		const animations = spriteAsset?.spriteSheet.animations
		if (!animations) continue

		const state = world.components.spriteAnimations.get(entity)
		const animation = state && animations[state.name]

		if (!state || !animation) {
			const [name, defaultAnimation] = Object.entries(animations)[0] ?? []
			if (!name || !defaultAnimation || defaultAnimation.frames.length === 0)
				continue

			const defaultState = { name, frameIndex: 0, elapsed: 0 }
			world.components.spriteAnimations.set(entity, defaultState)
			advanceAnimation(defaultState, defaultAnimation, deltaTime)
			continue
		}

		advanceAnimation(state, animation, deltaTime)
	}
}
