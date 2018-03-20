import {createStore, applyMiddleware, compose} from 'redux'
import {fromJS} from 'immutable'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const initialState = {}

export default function configureStore(history) {
	const middlewares = [
		sagaMiddleware,
		routerMiddleware(history)
	]
	const enhancers = [
		applyMiddleware(...middlewares)
	]
	const composeEnhancers =
		process.env.NODE_ENV !== `production` &&
		typeof window === `object` &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false})
			: compose

	const store = createStore(
		createReducer(),
		fromJS(initialState),
		composeEnhancers(...enhancers)
	)
	store.runSaga = sagaMiddleware.run
	store.injectedSagas = {}

	return store
}
