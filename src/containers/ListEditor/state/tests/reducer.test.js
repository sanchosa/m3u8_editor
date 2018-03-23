import {fromJS} from 'immutable'
import {testValues} from './constants'
import reducer from '../reducer'
import {setNewList} from '../actions'
import {initialState} from '../constants'

describe(`ListEditor reducer`, () => {
	it(`should return the initial state`, () => {
		const expectedResult = initialState
		expect(reducer(undefined, {})).toEqual(expectedResult)
	})
	it(`should set picker data`, () => {
		const groups = testValues.string
		const channels = testValues.string
		const playlistName = testValues.string
		const expectedResult = initialState.withMutations(map => map
			.set(`channels`, fromJS(channels))
			.set(`groups`, fromJS(groups))
			.set(`playlistName`, playlistName))
		const action = setNewList({groups, channels, playlistName})
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
})