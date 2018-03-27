import {createSelector} from 'reselect'

export const selectListEditor = (state) => state.get(`listEditor`)

export const makeSelectEditorData = name => createSelector(
	selectListEditor,
	listEditor => listEditor && listEditor.get(name)
)

// export const makeSelectChannels = name => createSelector(
// 	selectListEditor,
// 	listEditor => listEditor && listEditor.get(name)
// )