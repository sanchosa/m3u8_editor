import {createSelector} from 'reselect'

export const selectGlobal = (state) => state.get(`global`)

export const makeSelectError = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`error`)
)

export const makeSelectLoading = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`loading`)
)

export const makeSelectLocale = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`locale`)
)

export const makeSelectStorageFlag = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`useStorage`)
)

export const makeSelectStorageInfo = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`storageInfo`)
)