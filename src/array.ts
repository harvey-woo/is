import is from './is'
/**
 * determine if the target is an array
 * 
 * ```javascript
 * isArray([]) // => true
 * isArray({ 0: 1, length: 1 }, true) // => true
 * ```
 * 
 * @param target 
 * @param loose return true if target likes an array
 */
function isArray(target: any, loose = false): boolean {
  if (!target) return false
  if (Array.isArray(target)) {
    return true
  }
  if (loose) {
    return target && (typeof target === 'object' || is(target, 'string')) && typeof target.length === 'number' && target.length >= 0 && target.length % 1 === 0
  }
  return false
}
export default isArray
/**
 * @ignore
 */
const rTyped = /^(?:Ui|I)nt\d+(?:Clamped)?Array$/
/**
 * determine if the target is an typed array, like Uint8Array, Int8Array
 * 
 * ```javascript
 * isTypedArray(new Uint8Array(16)) // => true
 * isTypedArray([]) // => false
 * ```
 * 
 * @param target
 */
export function isTypedArray(target: any): boolean {
  return is(target, rTyped)
}
/**
 * determine if the target is an array like object
 * this function is alias of isArray(target, true)
 * 
 * ```javascript
 * isArrayLike([]) // => true
 * isArrayLike({ 0:1, length: 1 }) // => true
 * 
 * @param target 
 */
export function isArrayLike(target: any): boolean {
  return isArray(target, true)
}