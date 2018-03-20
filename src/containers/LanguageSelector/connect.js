import {connect} from 'react-redux'
import {setLocale} from 'store/global/actions'

const mapActions = dispatch => ({
	onChange: value => dispatch(setLocale(value))
})

export default Component => connect(null, mapActions)(Component)