import {put, fork, cancel, takeLatest, select} from 'redux-saga/effects'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {BUILD_LIST, STOP} from './constants'
import {setParam} from './actions'

let task = null

const getDuration = duration =>
	`${duration || `-1`}`

const getChannelString = (channel, groupName, flags) => {
	const result = []
	flags.groupTitleFlag && result.push(`group-title="${groupName}"`)
	flags.tvgShiftFlag && channel.tvgShift && result.push(`tvg-shift="${channel.tvgShift}"`)
	flags.tvgNameFlag && channel.tvgName && result.push(`tvg-name="${channel.tvgName}"`)
	flags.tvgLogoFlag && channel.tvgLogo && result.push(`tvg-logo="${channel.tvgLogo}"`)
	flags.audioTrackFlag && channel.audioTrack && result.push(`audio-track="${channel.audioTrack}"`)

	const tmp = result.length > 0 && ` ${result.join(` `)}` || ``
	const duration = flags.formatDurationFlag && getDuration(channel.duration) || channel.duration
	return `#EXTINF:${duration}${tmp},${channel.name}`
}

function *buildList(flags) {
	const channels = yield select(makeSelectEditorData(`channels`))
	const groups = yield select(makeSelectEditorData(`groups`))
	const result = [`#EXTM3U`]

	yield put(setParam({
		data: null,
		loading: true
	}))

	if (flags.playlistNameFlag) {
		const listName = yield select(makeSelectEditorData(`playlistName`))
		listName && result.push(`#PLAYLIST:${listName}`)
	}

	let channel = null
	groups && groups
		.get(`index`)
		.toJS()
		.forEach(groupName =>
			groups
				.get(groupName)
				.forEach(channelId => {
					if (flags.groupExtentionFlag) {
						result.push(`#EXTGRP:${groupName}`)
					}
					channel = channels.get(channelId)
					flags.additionalFlag && channel.additional && result.push(channel.additional)
					result.push(getChannelString(channel, groupName, flags))
					result.push(channel.link)
				})
		)

	yield put(setParam({
		data: result.join(`\r\n`),
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
