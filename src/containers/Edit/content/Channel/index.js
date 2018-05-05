import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectEditParam} from 'containers/Edit/state/selectors'
import {setValue} from 'containers/Edit//state/actions'
import {
	createChannel,
	deleteChannel,
	editChannel
} from 'containers/ListEditor/state/actions'
import ChannelForm from './ChannelForm'

const leftProps = createStructuredSelector({
	group: makeSelectEditParam(`leftGroup`),
	channel: makeSelectEditParam(`leftChannel`)
})
const rightProps = createStructuredSelector({
	group: makeSelectEditParam(`rightGroup`),
	channel: makeSelectEditParam(`rightChannel`)
})
const mapActions = channel => dispatch => ({
	clearSelected: () => dispatch(setValue(channel, null)),
	createChannel: data => dispatch(createChannel(data)),
	deleteChannel: data => dispatch(deleteChannel(data)),
	editChannel: data => dispatch(editChannel(data))
})

export const LeftChannelForm = connect(leftProps, mapActions(`leftChannel`))(ChannelForm)
export const RightChannelForm = connect(rightProps, mapActions(`rightChannel`))(ChannelForm)