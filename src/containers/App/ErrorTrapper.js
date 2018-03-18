import ErrorTrapper from 'components/ErrorTrapper'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectError} from 'store/global/selectors'
import {setError} from 'store/global/actions'

const props = createStructuredSelector({error: makeSelectError()})
const action = (dispatch) => ({onError: (error) => dispatch(setError(error))})

export default connect(props, action)(ErrorTrapper)
