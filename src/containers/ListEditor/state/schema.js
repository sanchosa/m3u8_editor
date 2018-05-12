import {Record} from 'immutable'
import {schema} from 'normalizr'

export const ChannelRecord = new Record({
	id: null,
	duration: -1,
	name: null,
	link: null,
	tvgShift: null,
	tvgName: null,
	tvgLogo: null,
	audioTrack: null,
	// groupTitle: null,
	// group: null,
	additional: []
})

const channelSchema = new schema.Entity(`channels`, {}, {
	processStrategy: value => new ChannelRecord(value)
})
export const channelListSchema = [channelSchema]