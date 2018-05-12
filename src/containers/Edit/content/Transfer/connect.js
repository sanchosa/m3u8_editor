import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
	makeSelectTransferData,
	makeSelectEditParam
} from 'containers/Edit/state/selectors'
import {setValue} from 'containers/Edit/state/actions'
import {deleteChannel} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	transferData: makeSelectTransferData(),
	leftGroup: makeSelectEditParam(`leftGroup`),
	rightGroup: makeSelectEditParam(`rightGroup`)
})
const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value)),
	deleteChannel: data => dispatch(deleteChannel(data))
})

export default Component => connect(mapProps, mapActions)(Component)