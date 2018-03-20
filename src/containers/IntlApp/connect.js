import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectLocale} from 'store/global/selectors'

const mapProps = createStructuredSelector({
	localeString: makeSelectLocale()
})

export default Component => connect(mapProps)(Component)