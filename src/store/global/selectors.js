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

export const makeSelectLocation = () => createSelector(
	selectGlobal,
	globalState => {
		const location = globalState.get(`location`)
		return location && location.toJS()
	}
)

export const makeSelectStorageFlag = () => createSelector(
	selectGlobal,
	globalState => globalState.get(`useStorage`)
)