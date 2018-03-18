import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'

import {combineReducers} from 'redux-immutable'
import createReducer from 'store/reducers'
import checkStore from './check-store'

function checkReducer(reducer) {
	invariant(
		isFunction(reducer) || isObject(reducer),
		`injectReducer: Expected 'reducer' to be a reducer function`
	)
}

export const reducerStore = {
	map: {},
	set(name, reducers) {
		!this.map[name] && (this.map[name] = {})
		if (typeof reducers === `function`) {
			this.map[name] = reducers
			return
		}
		for (let key in reducers) {
			checkReducer(reducers[key])
			this.map[name][key] = reducers[key]
		}
	},
	get() {
		const result = {}
		for (let key of Object.keys(this.map)) {
			result[key] = typeof this.map[key] !== `function`
				? combineReducers(this.map[key])
				: this.map[key]
		}
		return result
	},
	clear() {
		this.map = {}
	}
}

export function injectReducerFactory(store, isValid = false) {
	return function injectReducer(value = {}) {
		if (!isValid) checkStore(store)
		for (let key in value) {
			invariant(
				isString(key) && !isEmpty(key),
				`injectReducer: Expected 'reducer key'`
			)
			checkReducer(value[key])
			reducerStore.set(key, value[key])
		}
		const reducers = reducerStore.get()
		store.replaceReducer(createReducer(reducers))
	}
}

export default function getInjectors(store) {
	checkStore(store)
	return {injectReducer: injectReducerFactory(store, true)}
}
