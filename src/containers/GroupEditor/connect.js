import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectEditParam} from 'containers/Edit/state/selectors'
import {makeSelectGroupNames} from 'containers/ListEditor/state/selectors'
import {
	deleteGroup,
	editGroup
} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	group: makeSelectEditParam(`rightGroup`),
	groups: makeSelectGroupNames()
})
const mapActions = dispatch => ({
	deleteGroup: value => dispatch(deleteGroup(value)),
	editGroup: data => dispatch(editGroup(data))
})

export default Component => connect(mapProps, mapActions)(Component)