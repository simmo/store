import isValidKey from './isValidKey'

const keyInvalidError = /must be a string/

describe('isValidKey()', () => {
  it('should only accept a string for a key', () => {
    expect(() => isValidKey('test')).not.toThrow(keyInvalidError)
    expect(() => isValidKey(['invalid'])).toThrow(keyInvalidError)
    expect(() => isValidKey(undefined)).toThrow(keyInvalidError)
    expect(() => isValidKey(null)).toThrow(keyInvalidError)
  })
})
