/**
 * detemine if target is a thenable.
 * it can be easily combined with asynchronous methods
 * 
 * you can checkout what is thenable [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
 * 
 * @param target 
 * 
 * ```javascript
 * if (isThenable(obj)) {
 *  obj.then(callback)
 * }
 * 
 * async foo() {
 *  if (isThenable(obj)) {
 *    await obj
 *  }
 * }
 * ```
 */
export function isThenable(target: any): boolean {
  return typeof target === 'object' && typeof target.then === 'function'
}