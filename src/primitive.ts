/** @ignore */
const primitives: { [type: string]: true } = {
  string: true,
  boolean: true,
  number: true,
  undefined: true,
  symbol: true
}
/** @ignore */
export function primitiveType(target: any) {
  if (target === null) return 'null'
  if (primitives[typeof target]) {
    return typeof target
  }
}

/**
 * detemine if target is primitive type, such as ```1```, ```"foobar"```
 * @param target 
 * 
 * ```javascript
 * 
 * isPrimitive(1) // => true
 * isPrimitive(null) // => true
 * isPrimitive({}) // => false
 * 
 * ```
 */
export default function isPrimitive(target: any): Boolean {
  return !!primitiveType(target)
}