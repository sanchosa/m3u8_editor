import {connect} from 'react-redux'
import {setValue} from './state/actions'
import {createGroup} from 'containers/ListEditor/state/actions'

const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value)),
	createGroup: value => dispatch(createGroup(value))
})

export default Component => connect(null, mapActions)(Component)
