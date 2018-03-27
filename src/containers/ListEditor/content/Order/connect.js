import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
	makeSelectEditorData
} from 'containers/ListEditor/state/selectors'

const mapProps = createStructuredSelector({
	items: makeSelectEditorData(`channels`)
})

export default Component => connect(mapProps)(Component)
