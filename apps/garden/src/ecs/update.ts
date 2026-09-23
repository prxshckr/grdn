import { commandSystem } from './systems/commandSystem'
import { eventSystem } from './systems/eventSystem'
import { keyboardInputSystem } from './systems/keyboardInputSystem'
import { loadSpriteSystem } from './systems/loadSpriteSystem'
import { mouseInputSystem } from './systems/mouseInputSystem'
import { spriteAnimationSystem } from './systems/spriteAnimationSystem'
import { touchInputSystem } from './systems/touchInputSystem'
import type { World } from './types'

export const update = (world: World, deltaTime: number) => {
	keyboardInputSystem(world)
	mouseInputSystem(world)
	touchInputSystem(world)
	eventSystem(world)
	commandSystem(world)
	void loadSpriteSystem(world)
	spriteAnimationSystem(world, deltaTime)
}
