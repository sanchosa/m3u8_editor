import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectTransferData} from 'containers/Edit/state/selectors'
import {setValue} from 'containers/Edit/state/actions'

const mapProps = createStructuredSelector({
	transferData: makeSelectTransferData()
})
const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value))
})

export default Component => connect(mapProps, mapActions)(Component)