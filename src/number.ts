import is from './is'
/**
 * detemine if target is a number but NaN.
 * ```javascript
 * isValidNumber('string') // => false
 * isValidNumber(new Number(11)) // => true
 * isValidNumber(11) // => false
 * isValidNumber('11') // => false
 * ```
 * @param target 
 */
export default function isValidNumber(target: any): target is Number {
  return is(target, 'number') && !isNaN(target)
}
/**
 * detemine if target is a negative number.
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isNegative(-1) // => true
 * isNegative(1) // => false
 * ```
 * also work between 0 and -0
 * ```javascript
 * isNegative(-0) // => true
 * isNegative(0) // => false
 * ```
 * 
 * @param target 
 */
export function isNegative(target: any): boolean {
  return isValidNumber(target) && 1 / +target < 0
}
/**
 * detemine if target is a positive number.
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isPositive(-1) // => false
 * isPositive(1) // => true
 * ```
 * also work between 0 and -0
 * ```javascript
 * isPositive(-0) // => false
 * isPositive(0) // => true
 * ```
 * @param target 
 */
export function isPositive(target: any): boolean {
  return isValidNumber(target) && 1 / +target > 0
}
/**
 * detemine if target is a decimal.
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isDec(1) // => false
 * isDec(1.1) // => true
 * ```
 * @param target 
 */
export function isDec(target: any): boolean {
  return isValidNumber(target) && +target % 1 !== 0
}
/**
 * detemine if target is a integer.
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isInt(1) // => true
 * isInt(1.1) // => false
 * ```
 * @param target 
 */
export function isInt(target: any): boolean {
  return isValidNumber(target) && +target % 1 === 0
}

/**
 * detemine if target is greater than other
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isGt(2, 1) // => true
 * isGt(1, 2) // => false
 * isGt('0', 1) // => false
 * ```
 * @param target 
 * @param other 
 */

export function isGt(target: any, other: any): boolean {
  return [target, other].every(it => isValidNumber(it)) && target > other
}
/**
 * detemine if target is less than other
 * **notice** any type which is not number type will return false
 * 
 * ```javascript
 * isLt(1, 2) // => true
 * isLt('0', 1) // => false
 * ```
 * @param target 
 * @param other 
 */
export function isLt(target: any, other: any): boolean {
  return [target, other].every(it => isValidNumber(it)) && target < other
}