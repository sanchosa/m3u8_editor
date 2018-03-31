import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setGroup} from './state/actions'
import {makeSelectGroupChannels} from './state/selectors'
import {makeSelectGroupNames} from 'containers/ListEditor/state/selectors'
import {sortChannel, sortGroup} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	items: makeSelectGroupChannels(),
	groups: makeSelectGroupNames()
})

const mapActions = dispatch => ({
	groupChange: value => dispatch(setGroup(value)),
	sortChannel: data => dispatch(sortChannel(data)),
	sortGroup: data => dispatch(sortGroup(data))
})

export default Component => connect(mapProps, mapActions)(Component)
