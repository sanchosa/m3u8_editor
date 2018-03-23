import {combineReducers} from 'redux-immutable'
import globalReducer from './global/reducer'
import listEditorReducer from 'containers/ListEditor/state/reducer'

export default function createReducer(injectedReducers) {
	return combineReducers({
		global: globalReducer,
		listEditor: listEditorReducer,
		...injectedReducers
	})
}
