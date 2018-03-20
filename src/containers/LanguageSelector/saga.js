import {put, takeLatest} from 'redux-saga/effects'
import storage from 'utils/local-storage'
import {setLocale} from 'store/global/actions'
import {SET_LOCALE} from 'store/global/constants'

function storeLocale(action) {
	storage.locale = action.payload
}

export default function *globalSaga() {
	if (`locale` in storage && [`enUS`, `ruRU`].includes(storage.locale)) {
		yield put(setLocale(storage.locale))
	}
	yield takeLatest(SET_LOCALE, storeLocale)
}