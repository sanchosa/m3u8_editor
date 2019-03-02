import moment from 'moment'
import {put, takeLatest, select, delay} from 'redux-saga/effects'
import storage from 'utils/local-storage'
import {setLocale, setStorageFlag, setStorageInfo} from 'store/global/actions'
import {SET_LOCALE, SET_STORAGE_FLAG, REMOVE_STORAGE_LIST} from 'store/global/constants'
import {selectListEditor} from 'containers/ListEditor/state/selectors'
import {
	SET_NEW_LIST,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME,
	CREATE_GROUP,
	DELETE_GROUP,
	EDIT_GROUP,
	CREATE_CHANNEL,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	COPY_CHANNEL,
	MOVE_CHANNEL,
	APPLY_COMPARE,
} from 'containers/ListEditor/state/constants'
import {loadStorageList} from 'containers/ListEditor/state/actions'
import {storageVersion, TIME_FOTMAT} from './constants'

let storageFlag = false

function storeLocale(action) {
	storage.locale = action.payload
}
function storeStorageFlag(action) {
	storage.storageFlag = action.payload
	storageFlag = action.payload
}
function *storeList() {
	if (storageFlag) {
		delay(1000)
		const list = yield select(selectListEditor)
		if (list) {
			const {groups, channels, playlistName} = list.toJS()
			const date = moment().format(TIME_FOTMAT)
			storage.list = {
				version: storageVersion,
				date,
				groups,
				channels,
				playlistName,
			}
			yield put(setStorageInfo({name: playlistName, date}))
		}
	}
}
function *removeStorageList() {
	if (storage.list) {
		localStorage.removeItem(`list`)
		yield put(setStorageInfo({}))
	}
}

export default function *storageSaga() {
	if (`locale` in storage && [`enUS`, `ruRU`].includes(storage.locale)) {
		yield put(setLocale(storage.locale))
	}
	if (`storageFlag` in storage) {
		storageFlag = storage.storageFlag
		yield put(setStorageFlag(storage.storageFlag))
	}
	if (`list` in storage) {
		const {playlistName, date, version, groups, channels} = storage.list
		if (version === storageVersion) {
			yield put(setStorageInfo({name: playlistName, date}))
			if (storageFlag) {
				yield put(loadStorageList({playlistName, groups, channels}))
			}
		}
	}

	yield takeLatest(SET_LOCALE, storeLocale)
	yield takeLatest(SET_STORAGE_FLAG, storeStorageFlag)
	yield takeLatest([
		SET_NEW_LIST,
		SORT_CHANNEL,
		SORT_GROUP,
		SET_LIST_NAME,
		CREATE_GROUP,
		DELETE_GROUP,
		EDIT_GROUP,
		CREATE_CHANNEL,
		EDIT_CHANNEL,
		DELETE_CHANNEL,
		COPY_CHANNEL,
		MOVE_CHANNEL,
		APPLY_COMPARE,
	], storeList)
	yield takeLatest(REMOVE_STORAGE_LIST, removeStorageList)
}