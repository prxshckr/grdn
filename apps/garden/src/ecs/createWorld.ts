import type { World } from './types'

export const createWorld = (): World => ({
	events: [],
	input: {
		keyboard: {
			events: [],
			pressed: new Set(),
			justPressed: new Set(),
			justReleased: new Set(),
		},
		mouse: {
			events: [],
			position: [0, 0],
			pressed: new Set(),
			justPressed: new Set(),
			justReleased: new Set(),
		},
		touch: {
			events: [],
			active: new Map(),
			justStarted: new Set(),
			justEnded: new Set(),
		},
	},
	nextEntity: 0,
	commands: [],
	spriteLoadRequests: new Set(),
	pendingSpriteLoads: new Set(),
	pendingImageLoads: new Map(),
	components: {
		positions: new Map(),
		sprites: new Map(),
		spriteAnimations: new Map(),
	},
	assets: {
		spriteAssets: new Map(),
	},
	entities: new Set(),
})
