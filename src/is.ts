import getType from './type'
import isArray from './array'
/** @ignore */
type Constructor = { new (...args: any[]): any }
/** 
 * a condition for [[is]] function
 * - **string** provide a string as condition to test target if is mets.
 *  > for example: ``` 'string' ``` will match a ``` new String('xxx') ``` and ``` 'xxx' ```.
 *    **notice: not case sensitive**
 * - **regexp** such as string, but you can accurately distinguish primitive type or boxed type
 *  > ```javascript
 *    is('string', /^string$/) // => true
 *    is(new String('string'), /^string$/) // => false
 *    is(new String('string'), /^String$/) // => true
 *    ```
 * - **constructor** you can also provide a constructor, ```is(promise, Promise)``` just simply equal ``` promise instanceof Promise ```
 */
type TypeCondition = string | RegExp | Constructor
/**
 * determine if the target meets the type condition
 * @param target 
 * @param type A type condition, see [[TypeCondition]]
 * 
 * with string
 * ```javascript
 * is('xxx', 'string') // => true
 * ```
 * 
 * with constructor
 * ```javascript
 * const p = new Promise()
 * is(p, Promise) // => true
 * ```
 * 
 * with regexp
 * ```javascript
 * const $a = document.querySelector('a')
 * const $h1 = document.querySelector('h1')
 * is($a, /Element/) // => true
 * is($h1, /Element/) // => true
 * ```
 * 
 */
function is(target: any, type: TypeCondition): boolean
/**
 * you can provide an array of type condition, return true if any of them are met
 * @param target 
 * @param types array of condition
 * 
 * ```javascript
 * is(new Set([1, 2]), [Map, Set]) // => true
 * ```
 */
function is(target: any, types: TypeCondition[]): boolean
function is(target: any, types: any) {
  if (!isArray(types)) {
    types = [types]
  } else {
    types = types.slice()
  }
  while(types.length) {
    let type = types.shift()
    if (typeof type === 'function' && target instanceof type) 
      return true
    let result = getType(target)
    if (!(type instanceof RegExp)) {
      type = new RegExp(`^${type}$`, 'i')
    }
    if (type.test(result)) {
      return true
    }
  }
  return false
}
export default is