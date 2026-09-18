import { DomManipulation } from '@garden/dom-manipulation'
import { GAME_CANVAS_ID } from './ui'

export const ELEMENT_GAME_CANVAS =
	DomManipulation.getElementById<HTMLCanvasElement>(GAME_CANVAS_ID)
