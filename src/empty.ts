import { isArrayLike } from './array'
import is from './is'
import { isPlainObject } from './object'
import isPrimitive from './primitive'
/**
 * @ignore
 */
const arrMapSet = [Map, Set]
/**
 * determine the target is empty, it's very useful in form validation
 * the followings mean target is empty
 * - target is a plain object and without any key-value
 * - target is an array or array like object and length is 0
 * - target is Map/Set and size is 0
 * - target is type of primitive and falsey
 * 
 * ```javascript
 * isEmpty({}) // => true
 * isEmpty(['']) // => false
 * isEmpty('xxx') // => false
 * isEmpty(true) // => false
 * isEmpty('') => true
 * ```
 * 
 * @param target 
 */
function isEmpty(target: any): boolean {
  if (isArrayLike(target)) {
    return !target.length
  }
  if (isPrimitive(target)) {
    return !target
  }
  if (isPlainObject(target)) {
    for (let name in target) {
      return false
    }
    return true
  }
  if (is(target, arrMapSet)) {
    return !target.size
  }
  if (typeof target.valueOf === 'function') {
    const unboxed = target.valueOf()
    if (unboxed !== target) {
      return isEmpty(target.valueOf())
    }
  }
  return false
}
export default isEmpty