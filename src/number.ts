import is from './is'
export default function isValidNumber(value: any): boolean {
  return is(value, 'number') && !isNaN(value)
}
export function isNegative(value: any): boolean {
  return isValidNumber(value) && 1 / value < 0
}
export function isPositive(value: any): boolean {
  return isValidNumber(value) && 1 / value > 0
}
export function isDec(value: any): boolean {
  return is(value, 'number') && value % 1 !== 0
}
export function isInt(value: any): boolean {
  return is(value, 'number') && value % 1 === 0
}

export function isGt(value: any, other: any): boolean {
  return [value, other].every(it => isValidNumber(it)) && value > other
}
export function isLt(value: any, other: any): boolean {
  return [value, other].every(it => isValidNumber(it)) && value < other
}