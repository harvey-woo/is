import type from './type'
import { isArrayLike } from './array'
/**
 * compare target with other and determine if they are equal
 * 
 * ```javascript
 * isEqual(1, 1) // => true
 * isEqual(1, new Number(1)) // true
 * isEqual({a: 1}, {a: 1}) // true
 * isEqual(1, '1') // false
 * ```
 * 
 * @param target 
 * @param other
 */
function isEqual(target: any, other: any): boolean {
  // 0 === -0 为true，但实际上不应该相等
  if (target === other) return target !== 0 || 1 / target == 1 / other
  // 比较类型（类名）
  const targetType: string = type(target, true)
  const otherType: string = type(other, true)
  if (targetType !== otherType)
    return false
  switch (targetType) {
  // 字符串，数字，日期，布尔比较值.
    case 'String':
      // 通过包装对象解决 '5' 实际上等于 String(5) 的情况
      return target == String(other)
    case 'Number':
      // 比较数字
      // NaN实际上是相等的，但不然，但通过以下方式仍可比较
      return target != +target ? other != +other : (target == 0 ? 1 / target == 1 / other : target == +other)
    case 'Date':
    case 'Boolean':
      // 日期和布尔量强行转换成数字进行比较
      // 非法日期转换将为NaN，所以仍然保持不相等
      return +target == +other
      // 正则则比较其表达式以及标记
    case 'RegExp':
      return target.source == other.source &&
        target.global == other.global &&
        target.multiline == other.multiline &&
        target.ignoreCase == other.ignoreCase
  }
  if (typeof target === 'object') {
    // 递归比较数组和对象
    if (isArrayLike(targetType)) {
      // 比较数组长度是否相同确定是否深度比较
      let size = target.length
      if (size !== other.length) return false
      // 深度比较，忽略key非数字的成员
      while (size--) {
        if (!isEqual(target[size], other[size])) {
          return false
        }
      }
      // 深度递归比较对象
      let key
      for (key in target) {
        if (target.hasOwnProperty(key)) {
          // 深度比较每个成员
          if (!other.hasOwnProperty(key) || !isEqual(target[key], other[key])) return false
        }
      }
      // 确保每个对象都包含相同数量的属性
      for (key in other) {
        if (!target.hasOwnProperty(key)) {
          return false
        }
      }
    }
    return true
  }
  // function and symbol, emmmmm, 鉴于前面的全等比较已经筛查过全等的数据，那么，不全等的symbol和function，直接返回false
  return false
}
export default isEqual