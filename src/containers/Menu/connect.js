import {connect} from 'react-redux'
import {setControl} from 'containers/ListEditor/state/actions'

const mapActions = dispatch => ({
	setControl: ({key}) => dispatch(setControl(key))
})

export default Component => connect(null, mapActions)(Component)