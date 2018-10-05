# Store

[![Travis][img-travis]][url-travis] [![npm][img-npm]][url-npm] [![downloads][img-downloads]][url-npm] [![License][img-license]][url-license]

[img-travis]: https://img.shields.io/travis/com/simmo/store.svg?style=flat-square
[url-travis]: https://travis-ci.com/simmo/store
[img-npm]: https://img.shields.io/npm/v/@simmo/store.svg?style=flat-square
[url-npm]: https://npmjs.org/package/@simmo/store
[img-license]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[url-license]: https://github.com/simmo/store/blob/master/LICENSE
[img-downloads]: https://img.shields.io/npm/dm/@simmo/store.svg?style=flat-square

JavaScript utility that provides a simple data store.

## Install

### NPM

`npm install @simmo/store`

### Yarn

`yarn add @simmo/store`

## Create a new store

```javascript
import Store from '@simmo/store'

const store = new Store()
```

Returns a new store.

### Config

You can optionally pass a set of options when creating a store.

#### `beforeSet`

Expects a function that returns a value. This value will be used instead of the value passed to `set()`. The function is provided a data object containing the following properties;

- `currentValue` - Current value in the store, defaults to `undefined`
- `isNew` - Boolean representing if the key is new
- `key` - the key passed to `set()`
- `newValue` - the value passed to `set()`

The example below would append the new value to the old.

```javascript
const store = new Store({
  beforeSet: ({ currentValue, isNew, newValue }) => {
    return isNew ? [newValue] : [...currentValue, newValue]
  },
})

store.set('Names', 'Mike')
store.get('Names')
// => ['Mike']

store.set('Names', 'Bob')
store.get('Names')
// => ['Mike', 'Bob']
```

## Methods

### `set(key, value)`

Returns the value saved to the store.

```javascript
store.set('Name', 'Mike')
// => 'Mike'
```

### `has(key)`

Returns `true` if the key exists, `false` if not.

```javascript
store.set('Name', 'Mike')

store.has('Name')
// => true

store.has(1234)
// => false
```

### `get(key)`

Returns the key's value.

```javascript
store.set('Name', 'Mike')
store.get('Name')
// => 'Mike'
```

### `delete(key)`

If the key exists, the key/value pair is removed and `true` is returned. If the key does not exist, it returns `false`.

```javascript
store.set('Name', 'Mike')

store.delete('Name')
// => true

store.delete('Something else')
// => false
```

### `clear()`

Empties the store.

```javascript
store.set('Name', 'Mike')

store.size
// => 1

store.clear()

store.size
// => 0
```

### `values()`

Returns an array of values from the store.

```javascript
store.set('Name', 'Mike')
store.set('Github', '@simmo')

store.values()
// => ['Mike', '@simmo']
```

### `keys()`

Returns an array of the keys used in the store.

```javascript
store.set('Name', 'Mike')
store.set('Github', '@simmo')

store.values()
// => ['Name', 'Github']
```

## Properties

### `size`

Returns the number of key/value pairs in the store.

```javascript
store.set('Name', 'Mike')

store.size
// => 1
```

## License

MIT © [Mike Simmonds](https://simmo.me)
