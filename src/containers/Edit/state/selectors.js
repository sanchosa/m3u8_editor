import {createSelector} from 'reselect'

const selectEdit = state => state.get(`edit`)

export const makeSelectEditParam = name => createSelector(
	selectEdit,
	edit => edit && edit.get(name)
)
