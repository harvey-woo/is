import { primitiveType } from './primitive'
/** @ignore */
const emptyObj = {}
/**
 * return type of target. 
 * the return value will follow the following rules.
 * - **primitive** return lowercase word
 *  > ```javascript
 *    type('string') // => 'string'
 *    type(1) // => 'number'
 *    type(null) // => 'null'
 *    type(undefined) // => 'undefined'
 *    ```
 * - **other types** return is capitalization constructor name
 *  > ```javascript
 *    type(new Set([1, 2, 3])) // => 'Set'
 *    type(new Number(111)) // => 'Number'
 *    ```
 * 
 * with boxed only
 * ```
 * type(1, true) // => 'Number'
 * type(null, true) // => 'Null'
 * ```
 * 
 * @param obj 
 * @param boxedOnly boxedOnly means return will always return boxed constructor name if target is primitive
 */
function type(obj: any, boxedOnly = false): string {
  const sPrimitiveType = primitiveType(obj)
  if (sPrimitiveType && !boxedOnly) return sPrimitiveType
  if (!sPrimitiveType && obj.constructor && obj.constructor.name) {
    return obj.constructor.name
  }
  return emptyObj.toString.call(obj).slice(8, -1)
}
export default type