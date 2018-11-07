# is
a micro type check lib, provides some common types of detection methods

[documentation](https://harvey-woo.github.io/is/index.html)

[![npm version](https://img.shields.io/npm/v/@cat5th/is.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/is)
[![coverage](https://img.shields.io/codecov/c/github/harvey-woo/is.svg?style=flat-square)](https://codecov.io/gh/harvey-woo/is)
[![npm downloads](https://img.shields.io/npm/dt/@cat5th/is.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/is)
[![Build Status](https://img.shields.io/travis/harvey-woo/is.svg?style=flat-square)](https://travis-ci.org/harvey-woo/is)

## How to Use


### Installation
```PowerShell
npm i @cat5th/is
```

### Import the function you need
```javascript
import { type, isPlainObject } from '@cat5th/is'
```
### Enjoy it
```javascript
import {type, isPlainObject, isEqual } from '@cat5th/is' 
type(1) // => 'number'
isPlainObject({}) // => true
isEqual({a: 1}, {a: 1}) // => true
```

### **@cat5th/is** provides variable function such as
- is
- isArrayLike
- isEqual
- isPlainObject
- isPrimitive
- ...
- you can post issus if you and any good idea of feature

You can check it out from the [documentation](https://harvey-woo.github.io/is/index.html)

