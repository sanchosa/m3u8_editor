import {createSelector} from 'reselect'

const selectCompareDomain = state => state.get(`compare`)

export const makeSelectCompareData = key => createSelector(
	selectCompareDomain,
	compare => compare.get(key)
)
