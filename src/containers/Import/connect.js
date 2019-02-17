import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectChannelsSize} from 'containers/ListEditor/state/selectors'
import {loadNewList, compareList} from 'containers/ListEditor/state/actions'
import {setStorageFlag, removeStorageList} from 'store/global/actions'
import {makeSelectStorageFlag, makeSelectStorageInfo} from 'store/global/selectors'

const mapProps = createStructuredSelector({
	storageFlag: makeSelectStorageFlag(),
	storageInfo: makeSelectStorageInfo(),
	channelsSize: makeSelectChannelsSize(),
})
const mapActions = {
	loadNewList,
	compareList,
	setStorageFlag: e => setStorageFlag(e.target.checked),
	removeStorageList,
}

export default Component => connect(mapProps, mapActions)(Component)