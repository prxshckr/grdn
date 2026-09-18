import { describe, expect, test } from "bun:test"
import { DomManipulation } from "../src/DomManipulation"
import { NAMESPACE } from "../src/constants"

type AttributeCall = {
	namespace: string | null
	qualifiedName: string
	value: string
}

type TestElement = Element &
	ElementCSSInlineStyle & {
		appendCalls: Node[]
		attributeCalls: AttributeCall[]
		innerText: string
	}

const createTestElement = (): TestElement => {
	const appendCalls: Node[] = []
	const attributeCalls: AttributeCall[] = []

	return {
		appendCalls,
		attributeCalls,
		appendChild<T extends Node>(child: T) {
			appendCalls.push(child)

			return child
		},
		innerText: "",
		setAttributeNS(
			namespace: string | null,
			qualifiedName: string,
			value: string,
		) {
			attributeCalls.push({ namespace, qualifiedName, value })
		},
		style: {},
	} as unknown as TestElement
}

describe("DomManipulation", () => {
	test("exposes its wrapped element", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element })

		expect(dom.element).toBe(element)
	})

	test("sets an attribute in its configured namespace", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element, ns: NAMESPACE.svg })

		dom.setAttribute("viewBox", "0 0 24 24")

		expect(element.attributeCalls).toEqual([
			{
				namespace: NAMESPACE.svg,
				qualifiedName: "viewBox",
				value: "0 0 24 24",
			},
		])
	})

	test("sets each supplied attribute in its configured namespace", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element })

		dom.setAttributes({ id: "garden", role: "presentation" })

		expect(element.attributeCalls).toEqual([
			{ namespace: NAMESPACE.html, qualifiedName: "id", value: "garden" },
			{
				namespace: NAMESPACE.html,
				qualifiedName: "role",
				value: "presentation",
			},
		])
	})

	test("sets camelCase inline style properties", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element })

		dom.setStyle("backgroundColor", "tomato")

		expect(element.style.backgroundColor).toBe("tomato")
	})

	test("sets each supplied camelCase inline style property", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element })

		dom.setStyles({ backgroundColor: "tomato", fontSize: "16px" })

		expect(element.style.backgroundColor).toBe("tomato")
		expect(element.style.fontSize).toBe("16px")
	})

	test("sets the wrapped element's text", () => {
		const element = createTestElement()
		const dom = new DomManipulation({ element })

		dom.setText("Garden")

		expect(element.innerText).toBe("Garden")
	})

	test("appends its wrapped element to a parent", () => {
		const parent = createTestElement()
		const child = createTestElement()
		const dom = new DomManipulation({ element: child })

		expect(dom.appendTo(parent)).toBe(dom)
		expect(parent.appendCalls).toEqual([child])
	})
})
