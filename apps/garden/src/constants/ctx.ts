import { CanvasCtx } from '@garden/canvas-ctx'
import { ELEMENT_GAME_CANVAS } from './elements'

export const CTX = new CanvasCtx(ELEMENT_GAME_CANVAS.element.getContext('2d')!)
