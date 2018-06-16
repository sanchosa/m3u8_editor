import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {loadNewList} from 'containers/ListEditor/state/actions'
import {setStorageFlag, removeStorageList} from 'store/global/actions'
import {makeSelectStorageFlag, makeSelectStorageInfo} from 'store/global/selectors'

const mapProps = createStructuredSelector({
	storageFlag: makeSelectStorageFlag(),
	storageInfo: makeSelectStorageInfo(),
})
const mapActions = dispatch => ({
	loadNewList: obj => dispatch(loadNewList(obj)),
	setStorageFlag: e => dispatch(setStorageFlag(e.target.checked)),
	removeStorageList: () => dispatch(removeStorageList())
})

export default Component => connect(mapProps, mapActions)(Component)