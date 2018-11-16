export type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray
export type FalseyPrimitive = '' | null | false | undefined | 0
export type Primitive = number | string | null | undefined | boolean | symbol
export type ObjectLike = object | Function
export type EmptyArrayLike = {
  readonly length: 0
}
export type PlainObject = { [name: string]: any }
type EmptyPlainObject = { [index: string]: never } 

// TODO: Well, I have no idea how to check a map or a set if is empty, any one would help me, and valueOf object, too
export type Empty = Map<any, any> | Set<any> | FalseyPrimitive | EmptyArrayLike | EmptyPlainObject | [] | { valueOf: () => Empty }