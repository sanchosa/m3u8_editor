// import { take, call, put, select } from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {put, fork, cancel, takeLatest} from 'redux-saga/effects'
import {BUILD_LIST, STOP} from './constants'
import {setParam} from './actions'

let task = null

function *buildList({groupTitleFlag, groupExtentionFlag}) {
	yield put(setParam({
		data: null,
		loading: true
	}))

	console.log(groupTitleFlag, groupExtentionFlag)
	yield delay(10000)
	yield put(setParam({
		data: `test`,
		loading: false
	}))
}

function *forkTask({payload}) {
	task = yield fork(buildList, payload)
}

function *stopTask() {
	if (task) {
		yield cancel(task)
		task = null
		yield put(setParam({
			data: null,
			loading: false
		}))
	}
}

export default function *exportSaga() {
	yield takeLatest(BUILD_LIST, forkTask)
	yield takeLatest(STOP, stopTask)
}
