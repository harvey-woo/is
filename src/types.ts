export type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray
export type FalseyPrimitive = '' | null | false | undefined | 0
export type Primitive = number | string | null | undefined | boolean | symbol
export type ObjectLike = object | Function
export type EmptyArrayLike = {
  readonly length: 0
}
export type PlainObject = { [name: string]: any }
export type EmptyPlainObject = {
    constructor?: Function
}
export type Empty = FalseyPrimitive | EmptyArrayLike | EmptyPlainObject | [] | { valueOf: () => Empty }
