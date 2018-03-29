import {Record} from 'immutable'
import {schema} from 'normalizr'

const channel = new Record({
	id: null,
	duration: -1,
	name: null,
	link: null,
	tvgShift: null,
	tvgName: null,
	tvgLogo: null,
	groupTitle: null,
	group: null,
	additional: []
})

const channelSchema = new schema.Entity(`channels`, {}, {
	processStrategy: value => new channel(value)
})
export const channelListSchema = [channelSchema]