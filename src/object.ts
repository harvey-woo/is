import { ObjectLike, PlainObject } from './types'
/**
 * detemine if target is a plain object
 * 
 * ```javascript
 * isPlainObject({ a: 1 }) // => true
 * isPlainObject(new Promise(() => {})) // false
 * ```
 * @param target 
 */
export function isPlainObject(target: any): target is PlainObject  {
  if (!target) return false
  return Object.getPrototypeOf(target) === Object.prototype || Object === target.constructor
}

/**
 * detemine if target is object-like such as function
 * ```javascript
 * isObjectLike({}) // => true
 * isObjectLike(function() {}) // => true
 * ```
 * it usually use to check some variable is extendable
 * ```javascript
 * let namespace = {}
 * if (isObjectLike(namespace)) {
 *  namespace.member = 1
 * }
 * 
 * ```
 * 
 * @param target 
 */
export function isObjectLike(target: any): target is ObjectLike {
  return typeof target === 'object' || typeof target === 'function'
}

/**
 * detemine if target is a global object, for example: ```window```, ```global```
 * @param target 
 */
export function isGlobal(target: any): boolean {
  return typeof target === 'object' && typeof target.setTimeout === 'function'
}

/**
 * detemine if target can be cloned, for example: jQuery Object
 * @param target 
 */
export function isCloneble(target:any): boolean {
  return typeof target === 'object' && typeof target.clone === 'function'
}

// /**
//  * 
//  * @param element 
//  */
// function isNode(target){
//   return (typeof Node === 'function') && target instanceof Node
// }