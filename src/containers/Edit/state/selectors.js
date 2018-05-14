import {createSelector} from 'reselect'
import {denormalize} from 'normalizr'
import {Map} from 'immutable'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {channelListSchema} from 'containers/ListEditor/state/schema'

const selectEdit = state => state.get(`edit`)

export const makeSelectEditParam = name => createSelector(
	selectEdit,
	edit => edit && edit.get(name)
)

export const makeSelectTransferData = () => createSelector(
	makeSelectEditorData(`channels`),
	makeSelectEditorData(`groups`),
	makeSelectEditParam(`leftGroup`),
	makeSelectEditParam(`rightGroup`),
	(channels, groups, leftGroupName, rightGroupName) => {
		if (!leftGroupName && !rightGroupName) return Map({})
		const dataSource = []
		const targetKeys = []
		const leftGroup = groups.get(leftGroupName)
		const rightGroup = groups.get(rightGroupName)
		const entities = {channels: channels.toJS()}
		const leftChannels = leftGroup
			? denormalize(leftGroup, channelListSchema, entities).toJS()
			: []
		const rightChannels = rightGroup
			? denormalize(rightGroup, channelListSchema, entities).toJS()
			: []

		leftChannels.forEach(value => dataSource.push(value))
		rightChannels.forEach(value => {
			targetKeys.push(value.id)
			dataSource.push(value)
		})

		return Map({dataSource, targetKeys})
	}
)