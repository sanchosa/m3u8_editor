import {fromJS, Map, List} from 'immutable'
import {normalize} from 'normalizr'
import {channelListSchema} from '../schema'
import {testValues} from 'common/constants'
import reducer from '../reducer'
import {
	setNewList,
	setControl,
	sortChannel,
	sortGroup,
	setListName,
	createGroup,
	deleteGroup,
	editGroup
} from '../actions'
import {initialState} from '../constants'

describe(`ListEditor reducer`, () => {
	it(`should return the initial state`, () => {
		const expectedResult = initialState
		expect(reducer(undefined, {})).toEqual(expectedResult)
	})
	it(`should set picker data`, () => {
		const groups = testValues.string
		const channels = [{id: 1, name: testValues.string}, {id: 2, name: testValues.string}]
		const normalizedChannels = normalize(channels, channelListSchema).entities.channels
		const playlistName = testValues.string
		const expectedResult = initialState.withMutations(map => map
			.set(`channels`, Map(normalizedChannels))
			.set(`groups`, fromJS(groups))
			.set(`playlistName`, playlistName))
		const action = setNewList({groups, channels, playlistName})
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
	it(`should set control data`, () => {
		const expectedResult = initialState
			.set(`control`, testValues.string)
		const action = setControl(testValues.string)
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
	it(`should move channel in 'test' group`, () => {
		const mockedState = initialState
			.setIn([`groups`, `test`], List([`1`, `2`]))
		const expectedResult = initialState
			.setIn([`groups`, `test`], List([`2`, `1`]))
		const action = sortChannel({
			group: `test`,
			oldIndex: 1,
			newIndex: 0
		})
		expect(reducer(mockedState, action)).toEqual(expectedResult)
	})
	it(`should move items in 'index' group`, () => {
		const mockedState = initialState
			.setIn([`groups`, `index`], List([`1`, `2`]))
		const expectedResult = initialState
			.setIn([`groups`, `index`], List([`2`, `1`]))
		const action = sortGroup({
			oldIndex: 1,
			newIndex: 0
		})
		expect(reducer(mockedState, action)).toEqual(expectedResult)
	})
	it(`should set playlistName data`, () => {
		const expectedResult = initialState
			.set(`playlistName`, testValues.string)
		const action = setListName(testValues.string)
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
	it(`should create new group`, () => {
		const expectedResult = initialState
			.setIn([`groups`, `${testValues.string}`], List())
			.updateIn([`groups`, `index`], index => index.push(testValues.string))
		const action = createGroup(testValues.string)
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
	it(`should delete group`, () => {
		const mockedState = initialState
			.setIn([`groups`, `${testValues.string}`], List())
			.updateIn([`groups`, `index`], index => index.push(testValues.string))
		const action = deleteGroup(testValues.string)
		expect(reducer(mockedState, action)).toEqual(initialState)
	})
	it(`should edit group`, () => {
		const mockedState = initialState
			.setIn([`groups`, `123`], List())
			.updateIn([`groups`, `index`], index => index.push(123))
		const expectedResult = initialState
			.setIn([`groups`, `${testValues.string}`], List())
			.updateIn([`groups`, `index`], index => index.push(testValues.string))
		const action = editGroup({
			current: `123`,
			newOne: testValues.string
		})
		expect(reducer(mockedState, action)).toEqual(expectedResult)
	})
})