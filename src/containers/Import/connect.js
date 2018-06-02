import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {loadNewList} from 'containers/ListEditor/state/actions'
import {setStorageFlag} from 'store/global/actions'
import {makeSelectStorageFlag} from 'store/global/selectors'

const mapProps = createStructuredSelector({
	storageFlag: makeSelectStorageFlag()
})
const mapActions = dispatch => ({
	loadNewList: obj => dispatch(loadNewList(obj)),
	setStorageFlag: e => dispatch(setStorageFlag(e.target.checked))
})

export default Component => connect(mapProps, mapActions)(Component)