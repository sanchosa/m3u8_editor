import {fromJS} from 'immutable'

export const BUILD_LIST = `Export/BUILD_LIST`
export const STOP = `Export/STOP`
export const SET_PARAM = `Export/SET_PARAM`

export const initialState = fromJS({
	data: null,
	loading: false,
	playlistNameFlag: true,
	groupExtentionFlag: true,
	additionalFlag: true,
	formatDurationFlag: true,
	groupTitleFlag: true,
	tvgShiftFlag: true,
	tvgNameFlag: true,
	tvgLogoFlag: true,
	audioTrackFlag: true,
	readonly: true
})