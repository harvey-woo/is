import { expect } from 'chai'
import { isThenable, isTypedArray, isArray, isArrayLike, isEqual, is, isDec, isEmpty, isInt, isLt, isGt, isGlobal, isNegative, isValidNumber, isPositive, isIterable, isObjectLike, isPlainObject, isPrimitive, type } from '..'

describe('test primitive', () => {
  it('isPrimitive', () => {
    expect(isPrimitive('')).to.true
    expect(isPrimitive(1)).to.true
    expect(isPrimitive(undefined)).to.true
    expect(isPrimitive(null)).to.true
    expect(isPrimitive({})).to.false
  })
})
describe('test type', () => {
  it('primitives', () => {
    expect(type('')).to.equal('string')
    expect(type(1)).to.equal('number')
    expect(type(undefined)).to.equal('undefined')
    expect(type(null)).to.equal('null')
    // @ts-ignore
    expect(type(Symbol('asda'))).to.equal('symbol')

  })
  it('boxedOnly primitives', () => {
    expect(type('', true)).to.equal('String')
    expect(type(1, true)).to.equal('Number')
    expect(type(undefined, true)).to.equal('Undefined')
    expect(type(null, true)).to.equal('Null')
    // @ts-ignore
    expect(type(Symbol('asda'), true)).to.equal('Symbol')

  })
  it('basic object', () => {
    expect(type(/asda/)).to.equal('RegExp')
    expect(type({})).to.equal('Object')
    expect(type([])).to.equal('Array')
    expect(type(() => {})).to.equal('Function')
    expect(type(new Date())).to.equal('Date')
    expect(type(new String(''))).to.equal('String')
    expect(type(new Boolean(true))).to.equal('Boolean')
    expect(type(new Number(1))).to.equal('Number')
  })
  it('custome class', () => {
    expect(type(new class A {})).to.equal('A')
  })
})
describe('test is', () => {
  it('string', () => {
    expect(is('', 'string')).to.true
    expect(is(new String(''), 'string')).to.true
  })
  it('regexp', () => {
    const r = /regexp|number/i
    expect(is(r, r)).to.true
    expect(is(111, r)).to.true
    expect(is('111', r)).to.false
  })
  it('class', () => {
    class A {}
    class B extends A {}
    expect(is(new A, A)).to.true
    expect(is(new B, A)).to.true
    expect(is(new B, Object)).to.true
    expect(is({}, A)).to.false
    expect(is({}, Object)).to.true
  })
  it('array conditions', () => {
    expect(is(new Map(), [Map, Set])).to.true
    expect(is(new Set(), [Map, Set])).to.true
  })
})
describe('test array', () => {
  it('array', () => {
    expect(isArray([])).to.true
    expect(isArray(1)).to.false
    expect(isArray(null)).to.false
    expect(isArray({ length: 0 }, false)).to.false
  })
  it('array like', () => {
    expect(isArrayLike({ length: 0 })).to.true
    expect(isArrayLike('ssss')).to.true
    expect(isArrayLike({})).to.false
    expect(isArrayLike(1)).to.false
  })
  it('typed array', () => {
    const s = new Uint16Array(16)
    const b = new Uint8Array(16)
    expect(isTypedArray(s) && isTypedArray(b)).to.true
  })
})
describe('test object', () => {
  it('plain object', () => {
    expect(isPlainObject(null)).to.false
    expect(isPlainObject({})).to.true
    expect(isPlainObject(111)).to.false
    expect(isPlainObject(new class A{})).to.false
  })
  it('object like', () => {
    function a() {}
    expect(isObjectLike(a)).to.true
    expect(isObjectLike({})).to.true
    expect(isObjectLike(111)).to.false
  })
  it('global', () => {
    expect(isGlobal(global)).to.true
    expect(isGlobal({})).to.false
  })
})
describe('test iterator', () => {
  it('iterable', () => {
    expect(isIterable(new Map())).to.true
    expect(isIterable([])).to.true
    expect(isIterable({})).to.false
  })
})
describe('test thenbale', () => {
  it('thenable',  () => {
    const p = new Promise(() => {})
    expect(isThenable(p)).to.true
    expect(isThenable({then() {} })).to.true
    expect(isThenable({})).to.false
    expect(isThenable(11)).to.false
  })
})
describe('test empty', () => {
  it('primitive type', () => {
    expect(isEmpty(1)).to.false
    expect(isEmpty(0)).to.true
    expect(isEmpty('')).to.true
    expect(isEmpty('asdasd')).to.false
    expect(isEmpty(true)).to.false
    expect(isEmpty(false)).to.true
  })
  it('boxd type', () => {
    expect(isEmpty(new String(''))).to.true
    expect(isEmpty(new String('xxx'))).to.false
    expect(isEmpty(new Number(0))).to.true
    expect(isEmpty(new Number(1))).to.false
    expect(isEmpty(new Boolean(true))).to.false
    expect(isEmpty(new Boolean(false))).to.true
  })
  it('plain object and array like', () => {
    expect(isEmpty({'asd': 1})).to.false
    expect(isEmpty({})).to.true
    expect(isEmpty([])).to.true
    expect(isEmpty([1])).to.false
    expect(isEmpty({length: 0})).to.true
    expect(isEmpty({0: 1, length: 1})).to.false
  })
  it('other Object', () => {
    expect(isEmpty(new class A {})).to.false
  })
  it('map and set', () => {
    expect(isEmpty(new Map([[1, 'one'], [2, 'two']]))).to.false
    expect(isEmpty(new Map([]))).to.true
    expect(isEmpty(new Set([]))).to.true
    expect(isEmpty(new Set([1, 2]))).to.false
  })
})
describe('test number', () => {
  it('valid', () => {
    expect(isValidNumber(1)).to.true
    expect(isValidNumber('1')).to.false
    expect(isValidNumber(NaN)).to.false
  })
  it('positive negative', () => {
    expect(isNegative(-1)).to.true
    expect(isNegative('')).to.false
    expect(isNegative(1)).to.false
    expect(isPositive(-1)).to.false
    expect(isPositive('')).to.false
    expect(isPositive(1)).to.true
  })
  it('dec int', () => {
    expect(isInt(1.1)).to.false
    expect(isInt('')).to.false
    expect(isInt(1)).to.true
    expect(isDec(1)).to.false
    expect(isDec(1.1)).to.true
    expect(isDec('')).to.false
  })
  it('gt lt', () => {
    expect(isGt(1, '2')).to.false
    expect(isLt(1, '2')).to.false
    expect(isLt(1, 2)).to.true
    expect(isLt(2, 1)).to.false
    expect(isGt(1, 2)).to.false
    expect(isGt(2, 1)).to.true
  })
})
describe('test eq', () => {
  it('NaN, null, undefined', () => {
    expect(isEqual(NaN, NaN)).to.true
    expect(isEqual(null, null)).to.true
    expect(isEqual(undefined, undefined)).to.true
  })
  it('primitive to primitive', () => {
    expect(isEqual(1, 1)).to.true
    expect(isEqual('', '')).to.true
    expect(isEqual('', 'xxx')).to.false
    expect(isEqual(true, false)).to.false
    expect(isEqual('', false)).to.false
  })
  it('boxed to primitive or boxed', () => {
    expect(isEqual(new Number(1), 1)).to.true
    expect(isEqual(new Number(1), new Number(1))).to.true
    expect(isEqual(new Number(1), new Number(2))).to.false
    expect(isEqual(new String(''), '')).to.true
    expect(isEqual(new String(''), 'xxx')).to.false
    expect(isEqual(new String(''), new String('xxxx'))).to.false
  })
  it('regexp', () => {
    expect(isEqual(/a/, /a/)).to.true
    expect(isEqual(/a/gi, /a/gi)).to.true
    expect(isEqual(/a/, /b/)).to.false
    expect(isEqual(/a/g, /a/)).to.false
    expect(isEqual(/a/m, /a/)).to.false
  })
  it('customer instance', () => {
    class A {
      s = 1
    }
    expect(isEqual(new A, { s: 1})).to.false
    expect(isEqual(new A, new A)).to.true
    expect(isEqual(new A, 111)).to.false
  })
  it('array and array like', () => {
    expect(isEqual([], [])).to.true
    expect(isEqual([1], [1])).to.true
    expect(isEqual([1], ['1'])).to.false
    expect(isEqual([1], [1, 2])).to.false
    expect(isEqual({ length: 0 }, { length: 0 })).to.true
    expect(isEqual({ 0: 1, length: 1 }, { 0: 1, length: 1 })).to.true
    expect(isEqual({ 0: 1, length: 1 }, { 0: '1', length: 1 })).to.false
    expect(isEqual({ 0: 1, length: 1 }, { 0: 1, 1: 2, length: 2 })).to.false
  })
  it('symbol function', () => {
    const f1 = () => {}
    const f2 = f1
    const f3 = () => {}
    const s1 = Symbol('1')
    const s2 = s1
    const s3 = Symbol('1')
    expect(isEqual(f1, f2)).to.true
    expect(isEqual(f1, f3)).to.false
    expect(isEqual(s1, s2)).to.true
    expect(isEqual(s1, s3)).to.false
  })
  it('deep compare', () => {
    const obj1 = [{a: 1}, {b: 2}]
    const obj2 = [{a: 1}, {b: 2}]
    const obj2_f = [{a: 1}, {b: []}]
    const obj3 = { a: [1, 2, { a: 6 }] }
    const obj4 = { a: [1, 2, { a: 6 }] }
    const obj4_f = { a: [1, 2, { a: '5' }] }
    const obj4_f2 = { a: [1, 2, { a: 6, c: 7 }] }
    expect(isEqual(obj1, obj2)).to.true
    expect(isEqual(obj1, obj2_f)).to.false
    expect(isEqual(obj3, obj4)).to.true
    expect(isEqual(obj3, obj4_f)).to.false
    expect(isEqual(obj3, obj4_f2)).to.false
  })
})