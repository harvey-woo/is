import { primitiveType } from './primitive'
const emptyObj = {}
function type(obj: any, boxedOnly = false): string {
  const sPrimitiveType = primitiveType(obj)
  if (sPrimitiveType && !boxedOnly) return sPrimitiveType
  if (!sPrimitiveType && obj.constructor && obj.constructor.name) {
    return obj.constructor.name
  }
  return emptyObj.toString.call(obj).slice(8, -1)
}
export default type