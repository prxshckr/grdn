export type Tuple = readonly unknown[]

export type TupleHead<T extends Tuple> = T[0]

export type TupleTail<T extends Tuple> = T extends [unknown, ...infer Tail]
	? Tail
	: never
