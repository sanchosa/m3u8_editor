import {combineReducers} from 'redux-immutable'
import globalReducer from './global/reducer'
import listEditorReducer from 'containers/ListEditor/state/reducer'
import orderReducer from 'containers/Order/state/reducer'

export default function createReducer(injectedReducers) {
	return combineReducers({
		global: globalReducer,
		listEditor: listEditorReducer,
		order: orderReducer,
		...injectedReducers
	})
}
