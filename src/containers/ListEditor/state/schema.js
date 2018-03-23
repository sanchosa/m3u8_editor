import {Record} from 'immutable'
import {schema} from 'normalizr'

export const channel = new Record({
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

const channelSchema = new schema.Entity(`channels`)
export const channelListSchema = [channelSchema]