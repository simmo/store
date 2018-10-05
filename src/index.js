import invariant from 'invariant'
import isValidKey from './isValidKey'
import callIfExists from './callIfExists'

export default class Cache {
  constructor(options = {}) {
    ['beforeSet'].forEach(callback => {
      if (options[callback]) {
        invariant(
          typeof options[callback] === 'function',
          `'${callback}' must be a function`
        )
      }
    })

    this.options = options

    this.store = {}
  }

  set(key, value) {
    isValidKey(key)

    this.store[key] =
      callIfExists(this.options['beforeSet'], {
        currentValue: this.get(key),
        isNew: !this.has(key),
        key,
        newValue: value,
      }) || value

    return this.get(key)
  }

  has(key) {
    isValidKey(key)

    return !!this.store[key]
  }

  get(key) {
    isValidKey(key)

    return this.store[key]
  }

  delete(key) {
    isValidKey(key)

    if (this.has(key)) {
      delete this.store[key]
      return true
    }

    return false
  }

  get size() {
    return Object.keys(this.store).length
  }

  clear() {
    this.store = {}
  }

  values() {
    return Object.values(this.store)
  }

  keys() {
    return Object.keys(this.store)
  }

  toJSON() {
    return Object.entries(this.store).reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: value instanceof Cache ? value.toJSON() : value,
      }),
      {}
    )
  }
}
