import {
	SET_ERROR,
	SET_LOADING,
	SET_LOCALE,
	SET_STORAGE_FLAG,
	SET_STORAGE_INFO,
	REMOVE_STORAGE_LIST,
} from '../constants'

import {
	setLoading,
	setError,
	setLocale,
	setStorageFlag,
	setStorageInfo,
	removeStorageList,
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
	it(`Should have a type of SET_STORAGE_FLAG`, () => {
		const expected = {type: SET_STORAGE_FLAG, payload: false}
		expect(setStorageFlag(false)).toEqual(expected)
	})
	it(`Should have a type of SET_STORAGE_INFO`, () => {
		const expected = {type: SET_STORAGE_INFO, payload: `123`}
		expect(setStorageInfo(`123`)).toEqual(expected)
	})
	it(`Should have a type of REMOVE_STORAGE_LIST`, () => {
		const expected = {type: REMOVE_STORAGE_LIST, payload: null}
		expect(removeStorageList()).toEqual(expected)
	})
})