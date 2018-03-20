import {
	SET_ERROR,
	SET_LOADING,
	SET_LOCALE
} from '../constants'

import {
	setLoading,
	setError,
	setLocale
} from '../actions'

describe(`Global actions`, () => {
	it(`Should have a type of SET_LOADING`, () => {
		const expected = {type: SET_LOADING, payload: `123`}
		expect(setLoading(`123`)).toEqual(expected)
	})
	it(`Should have a type of SET_ERROR`, () => {
		const expected = {type: SET_ERROR, payload: `123`}
		expect(setError(`123`)).toEqual(expected)
	})
	it(`Should have a type of SET_LOCALE`, () => {
		const expected = {type: SET_LOCALE, payload: `123`}
		expect(setLocale(`123`)).toEqual(expected)
	})
})