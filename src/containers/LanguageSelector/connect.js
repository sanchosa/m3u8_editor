import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import injectSaga from 'utils/inject-saga'
import {DAEMON} from 'utils/constants'
import {setLocale} from 'store/global/actions'
import {makeSelectLocale} from 'store/global/selectors'
import localeSaga from './saga'

const mapProps = createStructuredSelector({
	value: makeSelectLocale()
})

const mapActions = dispatch => ({
	onChange: value => dispatch(setLocale(value))
})

const withSaga = injectSaga({locale: localeSaga}, DAEMON)
const withConnect = connect(mapProps, mapActions)

export default Component => compose(withSaga, withConnect)(Component)