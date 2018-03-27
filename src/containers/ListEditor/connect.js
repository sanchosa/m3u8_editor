import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import injectSaga from 'utils/inject-saga'
import {DAEMON} from 'utils/constants'
import listEditorSaga from './state/saga'
import {
	makeSelectEditorData
} from './state/selectors'

const mapProps = createStructuredSelector({
	control: makeSelectEditorData(`control`)
})

const withSaga = injectSaga({listEditor: listEditorSaga}, DAEMON)
const withConnect = connect(mapProps)

export default compose(withSaga, withConnect)