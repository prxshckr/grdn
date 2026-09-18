export type WasmValueType = 'i32' | 'i64' | 'f32' | 'f64'

type WasmValue<Type extends WasmValueType> = Type extends 'i64'
	? bigint
	: number

type WasmArguments<Types extends readonly WasmValueType[]> = {
	[Key in keyof Types]: Types[Key] extends WasmValueType
		? WasmValue<Types[Key]>
		: never
}

type WasmResult<Type extends WasmValueType | undefined> =
	Type extends WasmValueType ? WasmValue<Type> : undefined

export type LoadWasmFunctionOptions<
	Inputs extends readonly WasmValueType[],
	Output extends WasmValueType | undefined = undefined,
> = {
	module: WebAssembly.Module
	exportName: string
	inputTypes: Inputs
	outputType?: Output
	imports?: WebAssembly.Imports
}

export async function loadWasmFunction<
	const Inputs extends readonly WasmValueType[],
	const Output extends WasmValueType | undefined = undefined,
>({
	module,
	exportName,
	inputTypes,
	outputType,
	imports,
}: LoadWasmFunctionOptions<Inputs, Output>): Promise<
	(...inputs: WasmArguments<Inputs>) => WasmResult<Output>
> {
	const instance = await WebAssembly.instantiate(module, imports)
	const exported = instance.exports[exportName]

	if (typeof exported !== 'function') {
		throw new TypeError(`WebAssembly export "${exportName}" is not a function.`)
	}

	return (...inputs) => {
		if (inputs.length !== inputTypes.length) {
			throw new TypeError(
				`WebAssembly export "${exportName}" expects ${inputTypes.length} arguments, received ${inputs.length}.`,
			)
		}

		for (const [index, inputType] of inputTypes.entries()) {
			const expectedType = inputType === 'i64' ? 'bigint' : 'number'
			if (typeof inputs[index] !== expectedType) {
				throw new TypeError(
					`Argument ${index} for WebAssembly export "${exportName}" must be ${expectedType}.`,
				)
			}
		}

		const result = exported(...inputs)
		if (outputType === undefined) return undefined as WasmResult<Output>

		const expectedType = outputType === 'i64' ? 'bigint' : 'number'
		if (typeof result !== expectedType) {
			throw new TypeError(
				`WebAssembly export "${exportName}" returned ${typeof result}; expected ${expectedType}.`,
			)
		}

		return result as WasmResult<Output>
	}
}
