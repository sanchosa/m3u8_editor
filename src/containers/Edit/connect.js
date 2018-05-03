import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
	makeSelectEditParam,
	makeSelectTransferData
} from './state/selectors'
import {setValue} from './state/actions'
import {
	createGroup,
	createChannel,
	deleteChannel,
	editChannel
} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	leftGroup: makeSelectEditParam(`leftGroup`),
	rightGroup: makeSelectEditParam(`rightGroup`),
	transferData: makeSelectTransferData()
})
const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value)),
	createGroup: value => dispatch(createGroup(value)),
	createChannel: data => dispatch(createChannel(data)),
	deleteChannel: id => dispatch(deleteChannel(id)),
	editChannel: data => dispatch(editChannel(data))
})

export default Component => connect(mapProps, mapActions)(Component)