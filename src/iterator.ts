/**
 * detemine if target is iterable
 * it's very useful to check a object before for..of
 * 
 * ```javascript
 * let arr = [1, 2]
 * let map = new Map([1, 2])
 * isIterable(arr) // => true
 * isIterable(map) // => true
 * 
 * for (item of arr) {
 *  //...
 * }
 * 
 * for (item of map) {
 *  //...
 * }
 * 
 * 
 * ```
 * 
 * @param target 
 */
export default function isIterable(target: any) {
  return typeof target === 'object' && typeof target[Symbol.iterator] === 'function'
}