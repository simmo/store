import callIfExists from './callIfExists'

describe('callIfExists()', () => {
  it('should call the function', () => {
    const func = jest.fn()
    const args = ['a', 1, () => 'test', null]

    callIfExists(func, args)

    expect(func).toBeCalledWith(args)
  })

  it('should not call the function', () => {
    const func = jest.fn()

    callIfExists(null)

    expect(func).not.toBeCalled()
  })
})
