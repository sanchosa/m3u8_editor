import {createSelector} from 'reselect'

const selectExport = (state) => state.get(`export`)

export const makeSelectParam = name => createSelector(
	selectExport,
	map => map && map.get(name)
)
