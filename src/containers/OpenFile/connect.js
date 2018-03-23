import {connect} from 'react-redux'
import {loadNewList} from 'containers/ListEditor/state/actions'

const mapActions = dispatch => ({
	customRequest: obj => dispatch(loadNewList(obj))
})

export default Component => connect(null, mapActions)(Component)