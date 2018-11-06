import getType from './type'
import isArray from './array'
type TypeCondition = string | RegExp | { new(): any }
function is(target: any, type: TypeCondition): boolean
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