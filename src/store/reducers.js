import {combineReducers} from 'redux-immutable'
import globalReducer from './global/reducer'

export default function createReducer(injectedReducers) {
	return combineReducers({
		global: globalReducer,
		...injectedReducers
	})
}
