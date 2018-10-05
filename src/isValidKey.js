import invariant from 'invariant'

export default key => {
  const isValid = key && typeof key === 'string'

  invariant(isValid, `'${key}' is required and must be a string`)

  return isValid
}
