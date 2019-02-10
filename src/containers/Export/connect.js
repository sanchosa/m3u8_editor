import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectParam} from './state/selectors'
import {
	buildList,
	stop,
	setParam
} from './state/actions'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'

const props = createStructuredSelector({
	listName: makeSelectEditorData(`playlistName`),
	data: makeSelectParam(`data`),
	loading: makeSelectParam(`loading`),
	playlistNameFlag: makeSelectParam(`playlistNameFlag`),
	groupExtentionFlag: makeSelectParam(`groupExtentionFlag`),
	additionalFlag: makeSelectParam(`additionalFlag`),
	formatDurationFlag: makeSelectParam(`formatDurationFlag`),
	groupTitleFlag: makeSelectParam(`groupTitleFlag`),
	tvgShiftFlag: makeSelectParam(`tvgShiftFlag`),
	tvgNameFlag: makeSelectParam(`tvgNameFlag`),
	tvgLogoFlag: makeSelectParam(`tvgLogoFlag`),
	audioTrackFlag: makeSelectParam(`audioTrackFlag`),
	readonly: makeSelectParam(`readonly`)
})
const actions = dispatch => ({
	buildList: data => dispatch(buildList(data)),
	stop: () => dispatch(stop()),
	setParam: data => dispatch(setParam(data))
})

export default Component => connect(props, actions)(Component)