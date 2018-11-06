const primitives: { [type: string]: true } = {
  string: true,
  boolean: true,
  number: true,
  undefined: true,
  symbol: true
}

export function primitiveType(obj: any) {
  if (obj === null) return 'null'
  if (primitives[typeof obj]) {
    return typeof obj
  }
}

export default function isPrimitive(obj: any): Boolean {
  return !!primitiveType(obj)
}