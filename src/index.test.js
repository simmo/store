import Store from './'

const key1 = 'hello'
const key2 = 'goodbye'
const value1 = 'world'
const value2 = 'new'
const keyRequiredError = /is required/

describe('Store', () => {
  describe('constructor', () => {
    it('should create a new instance', () => {
      const store = new Store()

      expect(store).toBeInstanceOf(Store)

      const newStore = new Store()

      expect(newStore).not.toBe(store)
    })

    it('should check `beforeSet` is a function', () => {
      expect(() => new Store({ beforeSet: 'bob' })).toThrow(
        /'beforeSet' must be a function/
      )
    })
  })

  describe('methods', () => {
    describe('set', () => {
      const beforeSet = jest.fn(({ newValue }) => newValue)

      it('should require a key', () => {
        const store = new Store()

        expect(() => store.set(null, value1)).toThrow(keyRequiredError)
      })

      it('should save an item', () => {
        const store = new Store()

        expect(store.set(key1, value1)).toBe(value1)
      })

      it('should update an item', () => {
        const store = new Store()

        expect(store.set(key1, value1)).toBe(value1)
        expect(store.set(key1, value2)).toBe(value2)
      })

      it('should use `beforeSet` if provided on save', () => {
        const store = new Store({ beforeSet })

        store.set(key1, value1)

        expect(beforeSet).toBeCalledWith({
          currentValue: undefined,
          isNew: true,
          key: key1,
          newValue: value1,
        })
      })

      it('should use `beforeSet` if provided on update', () => {
        const store = new Store({ beforeSet })

        store.set(key1, value1)
        store.set(key1, value2)

        expect(beforeSet).toBeCalledWith({
          currentValue: value1,
          isNew: false,
          key: key1,
          newValue: value2,
        })
      })

      it('should use the returned value from `beforeSet`', () => {
        const store = new Store({
          beforeSet: ({ newValue }) => `test-${newValue}`,
        })

        store.set(key1, value1)

        expect(store.get(key1)).toBe(`test-${value1}`)
      })
    })

    describe('has', () => {
      it('should require a key', () => {
        const store = new Store()

        expect(() => store.has()).toThrow(keyRequiredError)
      })

      it('should return `true` if the item exists', () => {
        const store = new Store()

        store.set(key1, value1)

        expect(store.has(key1)).toBe(true)
      })

      it("should return `false` if the item doesn't exists", () => {
        const store = new Store()

        expect(store.has(key1)).toBe(false)
      })
    })

    describe('get', () => {
      it('should require a key', () => {
        const store = new Store()

        expect(() => store.get()).toThrow(keyRequiredError)
      })

      it("should return the item's value if it exists", () => {
        const store = new Store()

        store.set(key1, value1)

        expect(store.get(key1)).toBe(value1)
      })

      it("should return `undefined` if the item doesn't exist", () => {
        const store = new Store()

        store.set(key1, value1)

        expect(store.get(key2)).toBeUndefined()
      })
    })

    describe('delete', () => {
      it('should require a key', () => {
        const store = new Store()

        expect(() => store.delete()).toThrow(keyRequiredError)
      })

      it('should return `true` if the item exists', () => {
        const store = new Store()

        store.set(key1, value1)

        expect(store.delete(key1)).toBe(true)
      })

      it("should return `false` if the item doesn't exist", () => {
        const store = new Store()

        expect(store.delete(key1)).toBe(false)
      })

      it('should delete the item', () => {
        const store = new Store()

        store.set(key1, value1)

        expect(store.has(key1)).toBe(true)

        store.delete(key1)

        expect(store.has(key1)).toBe(false)
      })
    })

    describe('clear', () => {
      it('should return `undefined`', () => {
        const store = new Store()

        expect(store.clear()).toBeUndefined()
      })

      it('should remove all items', () => {
        const store = new Store()

        store.set(key1, value1)
        store.set(key2, value2)

        expect(store.size).toBe(2)

        store.clear()

        expect(store.size).toBe(0)
      })
    })

    describe('values', () => {
      it('should return an array of values', () => {
        const store = new Store()

        store.set(key1, value1)
        store.set(key2, value2)

        expect(store.values()).toEqual([value1, value2])
      })
    })

    describe('keys', () => {
      it('should return an array of keys', () => {
        const store = new Store()

        store.set(key1, value1)
        store.set(key2, value2)

        expect(store.keys()).toEqual([key1, key2])
      })
    })

    describe('toJSON', () => {
      const store = new Store()

      store.set('string', 'hello world')
      store.set('array', ['a', 'b', 'c'])
      store.set('object', { message: 'hello world' })

      const expectedJson = {
        string: 'hello world',
        array: ['a', 'b', 'c'],
        object: { message: 'hello world' },
      }

      it('should return a JSON representation of the keys and values', () => {
        expect(store.toJSON()).toEqual(expectedJson)
      })

      it('should call `toJSON()` on nested stores', () => {
        const subStore = new Store()
        subStore.set('test', 'hello world')
        store.set('nested store', subStore)

        const expectNestedJson = {
          test: 'hello world',
        }

        expect(store.toJSON()).toEqual({
          ...expectedJson,
          'nested store': { ...expectNestedJson },
        })
      })
    })
  })

  describe('properties', () => {
    describe('size', () => {
      it('should return `0` when empty', () => {
        const store = new Store()

        expect(store.size).toBe(0)
      })

      it('should return the number of items', () => {
        const store = new Store()

        store.set(key1, value1)
        store.set(key2, value2)

        expect(store.size).toBe(2)
      })
    })
  })
})
