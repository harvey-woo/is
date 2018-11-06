export function isThenable(value: any): boolean {
  return typeof value === 'object' && typeof value.then === 'function'
}