import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setGroup} from './state/actions'
import {makeSelectGroupChannels} from './state/selectors'
import {
	makeSelectGroupNames
} from 'containers/ListEditor/state/selectors'

const mapProps = createStructuredSelector({
	items: makeSelectGroupChannels(),
	groups: makeSelectGroupNames()
})

const mapActions = dispatch => ({
	groupChange: value => dispatch(setGroup(value))
})

export default Component => connect(mapProps, mapActions)(Component)
