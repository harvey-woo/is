import { isThenable, isTypedArray, isArray, isArrayLike, isEqual, is, isDec, isEmpty, isInt, isLt, isGt, isGlobal, isNegative, isValidNumber, isPositive, isIterable, isObjectLike, isPlainObject, isPrimitive, type } from '..'

describe('test primitive', () => {
  test('isPrimitive', () => {
    expect(isPrimitive('')).toBe(true)
    expect(isPrimitive(1)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive({})).toBe(false)
  })
})
describe('test type', () => {
  test('primitives', () => {
    expect(type('')).toBe('string')
    expect(type(1)).toBe('number')
    expect(type(undefined)).toBe('undefined')
    expect(type(null)).toBe('null')
    // @ts-ignore
    expect(type(Symbol('asda'))).toBe('symbol')

  })
  test('boxedOnly primitives', () => {
    expect(type('', true)).toBe('String')
    expect(type(1, true)).toBe('Number')
    expect(type(undefined, true)).toBe('Undefined')
    expect(type(null, true)).toBe('Null')
    // @ts-ignore
    expect(type(Symbol('asda'), true)).toBe('Symbol')

  })
  test('basic object', () => {
    expect(type(/asda/)).toBe('RegExp')
    expect(type({})).toBe('Object')
    expect(type([])).toBe('Array')
    expect(type(() => {})).toBe('Function')
    expect(type(new Date())).toBe('Date')
    expect(type(new String(''))).toBe('String')
    expect(type(new Boolean(true))).toBe('Boolean')
    expect(type(new Number(1))).toBe('Number')
  })
  test('custome class', () => {
    expect(type(new class A {})).toBe('A')
  })
})
describe('test is', () => {
  test('string', () => {
    expect(is('', 'string')).toBe(true)
    expect(is(new String(''), 'string')).toBe(true)
  })
  test('regexp', () => {
    const r = /regexp|number/i
    expect(is(r, r)).toBe(true)
    expect(is(111, r)).toBe(true)
    expect(is('111', r)).toBe(false)
  })
  test('class', () => {
    class A {}
    class B extends A {}
    expect(is(new A, A)).toBe(true)
    expect(is(new B, A)).toBe(true)
    expect(is(new B, Object)).toBe(true)
    expect(is({}, A)).toBe(false)
    expect(is({}, Object)).toBe(true)
  })
  test('array conditions', () => {
    expect(is(new Map(), [Map, Set])).toBe(true)
    expect(is(new Set(), [Map, Set])).toBe(true)
  })
})
describe('test array', () => {
  test('array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray(1)).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray({ length: 0 }, false)).toBe(false)
  })
  test('array like', () => {
    expect(isArrayLike({ length: 0 })).toBe(true)
    expect(isArrayLike('ssss')).toBe(true)
    expect(isArrayLike({})).toBe(false)
    expect(isArrayLike(1)).toBe(false)
  })
  test('typed array', () => {
    const s = new Uint16Array(16)
    const b = new Uint8Array(16)
    expect(isTypedArray(s) && isTypedArray(b)).toBe(true)
  })
})
describe('test object', () => {
  test('plain object', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(111)).toBe(false)
    expect(isPlainObject(new class A{})).toBe(false)
  })
  test('object like', () => {
    function a() {}
    expect(isObjectLike(a)).toBe(true)
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike(111)).toBe(false)
  })
  test('global', () => {
    expect(isGlobal(global)).toBe(true)
    expect(isGlobal({})).toBe(false)
  })
})
describe('test iterator', () => {
  test('iterable', () => {
    expect(isIterable(new Map())).toBe(true)
    expect(isIterable([])).toBe(true)
    expect(isIterable({})).toBe(false)
  })
})
describe('test thenbale', () => {
  test('thenable',  () => {
    const p = new Promise(() => {})
    expect(isThenable(p)).toBe(true)
    expect(isThenable({then() {} })).toBe(true)
    expect(isThenable({})).toBe(false)
    expect(isThenable(11)).toBe(false)
  })
})
describe('test empty', () => {
  test('primitive type', () => {
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('asdasd')).toBe(false)
    expect(isEmpty(true)).toBe(false)
    expect(isEmpty(false)).toBe(true)
  })
  test('boxd type', () => {
    expect(isEmpty(new String(''))).toBe(true)
    expect(isEmpty(new String('xxx'))).toBe(false)
    expect(isEmpty(new Number(0))).toBe(true)
    expect(isEmpty(new Number(1))).toBe(false)
    expect(isEmpty(new Boolean(true))).toBe(false)
    expect(isEmpty(new Boolean(false))).toBe(true)
  })
  test('plain object and array like', () => {
    expect(isEmpty({'asd': 1})).toBe(false)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({length: 0})).toBe(true)
    expect(isEmpty({0: 1, length: 1})).toBe(false)
  })
  test('other Object', () => {
    expect(isEmpty(new class A {})).toBe(false)
  })
  test('map and set', () => {
    expect(isEmpty(new Map([[1, 'one'], [2, 'two']]))).toBe(false)
    expect(isEmpty(new Map([]))).toBe(true)
    expect(isEmpty(new Set([]))).toBe(true)
    expect(isEmpty(new Set([1, 2]))).toBe(false)
  })
})
describe('test number', () => {
  test('valid', () => {
    expect(isValidNumber(1)).toBe(true)
    expect(isValidNumber('1')).toBe(false)
    expect(isValidNumber(NaN)).toBe(false)
  })
  test('positive negative', () => {
    expect(isNegative(-1)).toBe(true)
    expect(isNegative('')).toBe(false)
    expect(isNegative(1)).toBe(false)
    expect(isPositive(-1)).toBe(false)
    expect(isPositive('')).toBe(false)
    expect(isPositive(1)).toBe(true)
  })
  test('dec int', () => {
    expect(isInt(1.1)).toBe(false)
    expect(isInt('')).toBe(false)
    expect(isInt(1)).toBe(true)
    expect(isDec(1)).toBe(false)
    expect(isDec(1.1)).toBe(true)
    expect(isDec('')).toBe(false)
  })
  test('gt lt', () => {
    expect(isGt(1, '2')).toBe(false)
    expect(isLt(1, '2')).toBe(false)
    expect(isLt(1, 2)).toBe(true)
    expect(isLt(2, 1)).toBe(false)
    expect(isGt(1, 2)).toBe(false)
    expect(isGt(2, 1)).toBe(true)
  })
})
describe('test eq', () => {
  test('NaN, null, undefined', () => {
    expect(isEqual(NaN, NaN)).toBe(true)
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(undefined, undefined)).toBe(true)
  })
  test('primitive to primitive', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('', '')).toBe(true)
    expect(isEqual('', 'xxx')).toBe(false)
    expect(isEqual(true, false)).toBe(false)
    expect(isEqual('', false)).toBe(false)
  })
  test('boxed to primitive or boxed', () => {
    expect(isEqual(new Number(1), 1)).toBe(true)
    expect(isEqual(new Number(1), new Number(1))).toBe(true)
    expect(isEqual(new Number(1), new Number(2))).toBe(false)
    expect(isEqual(new String(''), '')).toBe(true)
    expect(isEqual(new String(''), 'xxx')).toBe(false)
    expect(isEqual(new String(''), new String('xxxx'))).toBe(false)
  })
  test('regexp', () => {
    expect(isEqual(/a/, /a/)).toBe(true)
    expect(isEqual(/a/gi, /a/gi)).toBe(true)
    expect(isEqual(/a/, /b/)).toBe(false)
    expect(isEqual(/a/g, /a/)).toBe(false)
    expect(isEqual(/a/m, /a/)).toBe(false)
  })
  test('customer instance', () => {
    class A {
      s = 1
    }
    expect(isEqual(new A, { s: 1})).toBe(false)
    expect(isEqual(new A, new A)).toBe(true)
    expect(isEqual(new A, 111)).toBe(false)
  })
  test('array and array like', () => {
    expect(isEqual([], [])).toBe(true)
    expect(isEqual([1], [1])).toBe(true)
    expect(isEqual([1], ['1'])).toBe(false)
    expect(isEqual([1], [1, 2])).toBe(false)
    expect(isEqual({ length: 0 }, { length: 0 })).toBe(true)
    expect(isEqual({ 0: 1, length: 1 }, { 0: 1, length: 1 })).toBe(true)
    expect(isEqual({ 0: 1, length: 1 }, { 0: '1', length: 1 })).toBe(false)
    expect(isEqual({ 0: 1, length: 1 }, { 0: 1, 1: 2, length: 2 })).toBe(false)
  })
  test('symbol function', () => {
    const f1 = () => {}
    const f2 = f1
    const f3 = () => {}
    const s1 = Symbol('1')
    const s2 = s1
    const s3 = Symbol('1')
    expect(isEqual(f1, f2)).toBe(true)
    expect(isEqual(f1, f3)).toBe(false)
    expect(isEqual(s1, s2)).toBe(true)
    expect(isEqual(s1, s3)).toBe(false)
  })
  test('deep compare', () => {
    const obj1 = [{a: 1}, {b: 2}]
    const obj2 = [{a: 1}, {b: 2}]
    const obj2_f = [{a: 1}, {b: []}]
    const obj3 = { a: [1, 2, { a: 6 }] }
    const obj4 = { a: [1, 2, { a: 6 }] }
    const obj4_f = { a: [1, 2, { a: '5' }] }
    const obj4_f2 = { a: [1, 2, { a: 6, c: 7 }] }
    expect(isEqual(obj1, obj2)).toBe(true)
    expect(isEqual(obj1, obj2_f)).toBe(false)
    expect(isEqual(obj3, obj4)).toBe(true)
    expect(isEqual(obj3, obj4_f)).toBe(false)
    expect(isEqual(obj3, obj4_f2)).toBe(false)
  })
})