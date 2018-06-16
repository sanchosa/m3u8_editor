import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setLocale} from 'store/global/actions'
import {makeSelectLocale} from 'store/global/selectors'

const mapProps = createStructuredSelector({
	value: makeSelectLocale()
})

const mapActions = dispatch => ({
	onChange: value => dispatch(setLocale(value))
})

export default Component => connect(mapProps, mapActions)(Component)