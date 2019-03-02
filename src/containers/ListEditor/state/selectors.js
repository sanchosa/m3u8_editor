import {createSelector} from 'reselect'

export const selectListEditor = (state) => state.get(`listEditor`)

export const makeSelectEditorData = name => createSelector(
	selectListEditor,
	listEditor => listEditor && listEditor.get(name)
)

export const makeSelectGroupNames = () => createSelector(
	makeSelectEditorData(`groups`),
	groups => groups && groups.get(`index`)
)

export const makeSelectChannelsSize = () => createSelector(
	makeSelectEditorData(`channels`),
	channels => channels.size
)

export const makeSelectCompareVisibility = () => createSelector(
	makeSelectEditorData(`compare`),
	compare => compare.get(`visible`)
)

export const makeSelectCompareNoDiff = () => createSelector(
	makeSelectEditorData(`compare`),
	compare => compare.get(`noDiff`)
)