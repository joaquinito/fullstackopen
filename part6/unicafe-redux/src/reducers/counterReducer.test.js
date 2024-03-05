// deepFreeze ensures that the reducer is correctly defined as an immutable function
import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('Unicafe reducer', () => {

    const initialStateZero = {
        good: 0,
        ok: 0,
        bad: 0
    }

    const initialStateNotZero = {
        good: 5,
        ok: 3,
        bad: 2
    }

    test('When called with an undefined state, it returns a proper initial state', () => {
        const action = {
            type: 'DO_NOTHING'
        }
        const state = undefined

        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialStateZero)
    })

    test('When called with an undefined action, it returns the initial state', () => {
        const action = {
            type: 'DO_NOTHING'
        }
        const state = initialStateNotZero

        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialStateNotZero)
    })

    test('When action is GOOD, good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialStateZero

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    test('When action is OK, ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = initialStateZero

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })

    test('When action is BAD, bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = initialStateZero

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
    })

    test('When action is RESET, all counters reset to 0', () => {
        const action = {
            type: 'RESET'
        }
        const state = initialStateNotZero

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialStateZero)
    })

})