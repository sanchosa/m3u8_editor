import {createSelector} from 'reselect'

export const selectGlobal = (state) => state.get(`global`)

export const selectRoute = (state) => state.get(`route`)

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
	selectRoute,
	routeState => routeState.get(`location`).toJS()
)
