import invariant from 'invariant'
import isValidKey from './isValidKey'
import callIfExists from './callIfExists'

export default class Store {
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

    this.data = {}
  }

  set(key, value) {
    isValidKey(key)

    this.data[key] =
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

    return !!this.data[key]
  }

  get(key) {
    isValidKey(key)

    return this.data[key]
  }

  delete(key) {
    isValidKey(key)

    if (this.has(key)) {
      delete this.data[key]
      return true
    }

    return false
  }

  get size() {
    return Object.keys(this.data).length
  }

  clear() {
    this.data = {}
  }

  values() {
    return Object.values(this.data)
  }

  keys() {
    return Object.keys(this.data)
  }

  toJSON() {
    return Object.entries(this.data).reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: value instanceof Store ? value.toJSON() : value,
      }),
      {}
    )
  }
}
