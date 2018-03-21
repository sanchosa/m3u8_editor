import {connect} from 'react-redux'

const mapActions = dispatch => ({
	customRequest: obj => console.log(obj) //dispatch(action(value))
})

export default Component => connect(null, mapActions)(Component)