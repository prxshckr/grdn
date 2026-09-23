import type { SpriteSheet, World } from '../types'

const isSpriteSheet = (value: unknown): value is SpriteSheet =>
	typeof value === 'object' &&
	value !== null &&
	'image' in value &&
	typeof value.image === 'string' &&
	'width' in value &&
	typeof value.width === 'number' &&
	'height' in value &&
	typeof value.height === 'number'

export const loadSpriteSystem = async (world: World) => {
	const urls = [...world.spriteLoadRequests]
	world.spriteLoadRequests.clear()

	await Promise.all(
		urls.map(async (url) => {
			if (
				world.assets.spriteAssets.has(url) ||
				world.pendingSpriteLoads.has(url)
			)
				return

			world.pendingSpriteLoads.add(url)
			let imageUrl: string | undefined

			try {
				const spriteSheetResponse = await fetch(url)
				if (!spriteSheetResponse.ok) {
					throw new Error(`Unable to load sprite sheet: ${url}`)
				}

				const spriteSheet: unknown = await spriteSheetResponse.json()
				if (!isSpriteSheet(spriteSheet)) {
					console.log(spriteSheet)
					throw new Error(`Invalid sprite sheet: ${url}`)
				}

				imageUrl = spriteSheet.image
				const cachedImage = [...world.assets.spriteAssets.values()].find(
					(spriteAsset) => spriteAsset.spriteSheet.image === spriteSheet.image,
				)?.image

				let pendingImageLoad = world.pendingImageLoads.get(spriteSheet.image)
				if (!cachedImage && !pendingImageLoad) {
					pendingImageLoad = (async () => {
						const imageResponse = await fetch(spriteSheet.image)
						if (!imageResponse.ok) {
							throw new Error(
								`Unable to load sprite image: ${spriteSheet.image}`,
							)
						}

						return createImageBitmap(await imageResponse.blob())
					})()
					world.pendingImageLoads.set(spriteSheet.image, pendingImageLoad)
				}

				if (cachedImage) {
					world.events.push({
						type: 'spriteLoaded',
						url,
						spriteSheet,
						image: cachedImage,
					})
					return
				}

				if (!pendingImageLoad) {
					throw new Error(`Unable to load sprite image: ${spriteSheet.image}`)
				}

				const image = await pendingImageLoad
				world.events.push({ type: 'spriteLoaded', url, spriteSheet, image })
			} catch (error) {
				world.events.push({
					type: 'spriteLoadFailed',
					url,
					error: error instanceof Error ? error : new Error(String(error)),
				})
			} finally {
				if (imageUrl) world.pendingImageLoads.delete(imageUrl)
			}
		}),
	)
}
