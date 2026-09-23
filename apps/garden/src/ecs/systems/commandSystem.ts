import type { World } from '../types'

export const commandSystem = (world: World) => {
	const commands = world.commands.splice(0)

	for (const command of commands) {
		switch (command.type) {
			case 'spawn': {
				const entity = world.nextEntity++

				world.entities.add(entity)
				break
			}
			case 'spawnSprite': {
				const entity = world.nextEntity++
				world.entities.add(entity)
				world.components.sprites.set(entity, command.url)
				world.spriteLoadRequests.add(command.url)

				if (command.position) {
					const [x, y] = command.position
					world.components.positions.set(entity, [x, y])
				}
				break
			}
			case 'loadSprite':
				world.spriteLoadRequests.add(command.url)
				break
		}
	}
}
