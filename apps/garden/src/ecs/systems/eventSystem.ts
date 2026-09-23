import type { World } from '../types'

export const eventSystem = (world: World) => {
	const events = world.events.splice(0)

	for (const event of events) {
		switch (event.type) {
			case 'spriteLoaded': {
				world.pendingSpriteLoads.delete(event.url)
				world.assets.spriteAssets.get(event.url)?.image.close()
				world.assets.spriteAssets.set(event.url, {
					spriteSheet: event.spriteSheet,
					image: event.image,
				})
				break
			}
			case 'spriteLoadFailed':
				world.pendingSpriteLoads.delete(event.url)
				console.error(event.error)
				break
		}
	}
}
