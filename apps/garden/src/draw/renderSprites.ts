import { CTX } from '../constants/ctx'
import type {
	SpriteAnimationFrame,
	SpriteAsset,
	SpriteSheet,
	World,
} from '../ecs/types'

const hasDimensions = (spriteSheet: SpriteSheet): spriteSheet is SpriteSheet =>
	typeof spriteSheet.width === 'number' &&
	typeof spriteSheet.height === 'number'

const drawStaticSprite = (spriteAsset: SpriteAsset, position: Pos2D) => {
	CTX.drawImage({
		image: spriteAsset.image,
		pos: position,
		width: spriteAsset.spriteSheet.width,
		height: spriteAsset.spriteSheet.height,
	})
}

const drawAnimatedSprite = (
	spriteAsset: SpriteAsset,
	position: Pos2D,
	frame: SpriteAnimationFrame,
) => {
	CTX.drawImage({
		image: spriteAsset.image,
		pos: position,
		width: spriteAsset.spriteSheet.width,
		height: spriteAsset.spriteSheet.height,
		source: {
			pos: [frame.x, frame.y],
			width: spriteAsset.spriteSheet.width,
			height: spriteAsset.spriteSheet.height,
		},
	})
}

export const renderSprites = (world: World, _deltaTime: number) => {
	for (const entity of world.entities) {
		const spriteUrl = world.components.sprites.get(entity)
		const spriteAsset =
			spriteUrl === undefined
				? undefined
				: world.assets.spriteAssets.get(spriteUrl)
		const position = world.components.positions.get(entity)

		if (!spriteAsset || !position || !hasDimensions(spriteAsset.spriteSheet))
			continue

		const state = world.components.spriteAnimations.get(entity)
		if (!state) {
			drawStaticSprite(spriteAsset, position)
			continue
		}

		const animation = spriteAsset.spriteSheet.animations?.[state.name]
		const frame = animation?.frames[state.frameIndex]

		if (frame) drawAnimatedSprite(spriteAsset, position, frame)
		else drawStaticSprite(spriteAsset, position)
	}
}
