export type KeyboardInputEvent =
	| { type: 'keyDown'; code: string }
	| { type: 'keyUp'; code: string }
	| { type: 'blur' }

export type KeyboardInput = {
	events: KeyboardInputEvent[]
	pressed: Set<string>
	justPressed: Set<string>
	justReleased: Set<string>
}

export type MouseInputEvent =
	| { type: 'move'; position: Pos2D }
	| { type: 'buttonDown'; button: number; position: Pos2D }
	| { type: 'buttonUp'; button: number; position: Pos2D }
	| { type: 'blur' }

export type MouseInput = {
	events: MouseInputEvent[]
	position: Pos2D
	pressed: Set<number>
	justPressed: Set<number>
	justReleased: Set<number>
}

export type TouchPoint = {
	id: number
	position: Pos2D
}

export type TouchInputEvent =
	| { type: 'start'; touches: TouchPoint[] }
	| { type: 'move'; touches: TouchPoint[] }
	| { type: 'end'; touches: TouchPoint[] }
	| { type: 'blur' }

export type TouchInput = {
	events: TouchInputEvent[]
	active: Map<number, Pos2D>
	justStarted: Set<number>
	justEnded: Set<number>
}

export type IntentionCommand = {}

export type Input = {
	keyboard: KeyboardInput
	mouse: MouseInput
	touch: TouchInput
}

export type SpawnCommand = {
	type: 'spawn'
}

export type SpawnSpriteCommand = {
	type: 'spawnSprite'
	url: string
	position?: Pos2D
}

export type LoadSpriteCommand = {
	type: 'loadSprite'
	url: string
}

export type Command = SpawnCommand | SpawnSpriteCommand | LoadSpriteCommand

export type SpriteAnimationFrame = {
	x: number
	y: number
	duration: number
}

export type SpriteAnimation = {
	frames: SpriteAnimationFrame[]
	loop: boolean
}

export type SpriteSheet = {
	image: string
	width: number
	height: number
	animations?: Record<string, SpriteAnimation>
}

export type SpriteLoadedEvent = {
	type: 'spriteLoaded'
	url: string
	spriteSheet: SpriteSheet
	image: ImageBitmap
}

export type SpriteLoadFailedEvent = {
	type: 'spriteLoadFailed'
	url: string
	error: Error
}

export type Event = SpriteLoadedEvent | SpriteLoadFailedEvent

export type SpriteAsset = {
	spriteSheet: SpriteSheet
	image: ImageBitmap
}

export type Position = Map<number, Pos2D>

export type SpriteAssets = Map<string, SpriteAsset>

export type Sprites = Map<number, string>

export type SpriteAnimationState = {
	name: string
	frameIndex: number
	elapsed: number
}

export type SpriteAnimations = Map<number, SpriteAnimationState>

export type World = {
	nextEntity: number
	entities: Set<number>
	components: {
		positions: Position
		sprites: Sprites
		spriteAnimations: SpriteAnimations
	}
	assets: {
		spriteAssets: SpriteAssets
	}
	commands: Command[]
	events: Event[]
	input: Input
	spriteLoadRequests: Set<string>
	pendingSpriteLoads: Set<string>
	pendingImageLoads: Map<string, Promise<ImageBitmap>>
}
