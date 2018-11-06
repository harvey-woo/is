export function isPlainObject(target: any): boolean {
  if (!target) return false
  return Object.getPrototypeOf(target) === Object.prototype || Object === target.constructor
}

export function isObjectLike(target: any): boolean {
  return typeof target === 'object' || typeof target === 'function'
}

export function isGlobal(target: any): boolean {
  return target && typeof target === 'object' && typeof target.setTimeout === 'function'
}