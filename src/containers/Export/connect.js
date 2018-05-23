import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import injectSaga from 'utils/inject-saga'
import {DAEMON} from 'utils/constants'
import saga from './state/saga'
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

const withConnect = connect(props, actions)
const withSaga = injectSaga({export: saga}, DAEMON)

export default Component => compose(
	withSaga,
	withConnect,
)(Component)