/**
 * detemine if target is a plain object
 * @param target 
 */
export function isPlainObject(target: any): boolean {
  if (!target) return false
  return Object.getPrototypeOf(target) === Object.prototype || Object === target.constructor
}

/**
 * detemine if target is object-like such as function
 * @param target 
 */
export function isObjectLike(target: any): boolean {
  return typeof target === 'object' || typeof target === 'function'
}

/**
 * detemine if target is a global object, for example: window, global
 * @param target 
 */
export function isGlobal(target: any): boolean {
  return target && typeof target === 'object' && typeof target.setTimeout === 'function'
}