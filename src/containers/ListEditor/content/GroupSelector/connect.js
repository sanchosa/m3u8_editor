import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {
	makeSelectGroupNames
} from 'containers/ListEditor/state/selectors'

const mapProps = createStructuredSelector({
	items: makeSelectGroupNames()
})

export default Component => connect(mapProps)(Component)
