import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {setListName} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	playlistName: makeSelectEditorData(`playlistName`)
})
const mapActions = dispatch => ({
	setListName: e => dispatch(setListName(e.target.value))
})

export default Component => connect(mapProps, mapActions)(Component)