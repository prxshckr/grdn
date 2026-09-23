import { CTX } from './constants/ctx'
import { ELEMENT_GAME_CANVAS } from './constants/elements'
import { SETTINGS } from './constants/ui'
import { drawText } from './draw/drawText'
import { renderSprites } from './draw/renderSprites'
import { createWorld } from './ecs/createWorld'
import { attachKeyboardInput } from './ecs/systems/keyboardInputSystem'
import { attachMouseInput } from './ecs/systems/mouseInputSystem'
import { attachTouchInput } from './ecs/systems/touchInputSystem'
import type { World } from './ecs/types'
import { update } from './ecs/update'
import { getGlyph } from './util/font/english/concrete-5x5'
import { renderLoop } from './util/timing/renderLoop'

const WORLD = createWorld()

const init = () => {
	ELEMENT_GAME_CANVAS.setAttributes({
		width: SETTINGS.width,
		height: SETTINGS.height,
	})

	window.addEventListener('resize', resize)

	attachKeyboardInput(WORLD)
	attachMouseInput(WORLD, ELEMENT_GAME_CANVAS.element)
	attachTouchInput(WORLD, ELEMENT_GAME_CANVAS.element)
}

const resize = () => {
	const scale = Math.min(
		window.innerWidth / SETTINGS.width,
		window.innerHeight / SETTINGS.height,
	)

	ELEMENT_GAME_CANVAS.setStyles({
		width: `${SETTINGS.width * scale}px`,
		height: `${SETTINGS.height * scale}px`,
	})
}

const draw = (world: World, deltaTime: number) => {
	CTX.fillRect({
		width: SETTINGS.width,
		height: SETTINGS.height,
		color: 'DeepSkyBlue',
	})

	renderSprites(world, deltaTime)

	drawText(CTX, {
		pos: [SETTINGS.width / 2 - 30, SETTINGS.height / 2 - 30],
		size: [5, 5],
		charBitMaps: 'KAI.ACADEMY'.split('').map(getGlyph),
		color: 'DodgerBlue',
	})
}

const animate = () => {
	WORLD.commands.push({
		type: 'spawnSprite',
		url: '/assets/clouds.json',
		position: [0, 172],
	})

	WORLD.commands.push({
		type: 'spawnSprite',
		url: '/assets/dino.json',
		position: [SETTINGS.width / 2 - 16, SETTINGS.height / 2 - 16],
	})

	renderLoop({
		update: (deltaTime) => {
			update(WORLD, deltaTime)
		},
		render: (deltaTime) => draw(WORLD, deltaTime),
	})
}

init()
resize()
animate()
