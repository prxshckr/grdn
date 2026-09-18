import { NAMESPACE } from './constants'
import type { Namespace } from './types'

export type DomManipulationOptions<
	E extends Element = Element,
	N extends Namespace = Namespace,
> = {
	ns?: N
	element: E
}

export type CreateElementOptions = {
	ns?: Namespace
	tag?: string
}

export class DomManipulation<E extends Element, N extends Namespace> {
	#ns: N
	#element: E

	get element() {
		return this.#element
	}

	static createElement<T extends HTMLElement>({
		ns = NAMESPACE.html,
		qualifiedName = 'div',
	}) {
		const element = document.createElementNS(ns, qualifiedName) as T

		return new DomManipulation({ ns, element })
	}

	static getElementById<T extends HTMLElement>(id: string) {
		const element = document.getElementById(id) as T

		return new DomManipulation({ ns: NAMESPACE.html, element })
	}

	constructor({
		ns = NAMESPACE.html as N,
		element,
	}: DomManipulationOptions<E, N>) {
		this.#ns = ns as N
		this.#element = element as E
	}

	setAttribute(
		qualifiedName: string,
		value: { toString: () => string },
		ns: string | null = null,
	) {
		this.#element.setAttributeNS(ns, qualifiedName, `${value}`)

		return this
	}

	setAttributes(
		attributes: Record<string, { toString: () => string }>,
		ns: string | null = null,
	) {
		for (const [qualifiedName, value] of Object.entries(attributes)) {
			this.setAttribute(qualifiedName, value, ns)
		}

		return this
	}

	setStyle(styleName: string, value: { toString: () => string }) {
		Reflect.set(
			(this.#element as E & ElementCSSInlineStyle).style,
			styleName,
			value,
		)

		return this
	}

	setStyles(styles: Record<string, { toString: () => string }>) {
		for (const [styleName, value] of Object.entries(styles)) {
			this.setStyle(styleName, value)
		}

		return this
	}

	setText(text: { toString: () => string }) {
		;(this.#element as unknown as HTMLElement).innerText = `${text}`

		return this
	}

	appendTo(parent: Element) {
		parent.appendChild(this.#element)

		return this
	}
}
