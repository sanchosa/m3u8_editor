import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
	makeSelectEditorData
} from './state/selectors'

const mapProps = createStructuredSelector({
	control: makeSelectEditorData(`control`)
})

export default connect(mapProps)