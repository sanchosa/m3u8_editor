import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
// import {compose} from 'redux'
import {makeSelectEditParam} from './state/selectors'
// import reducer from './reducer'
import {setValue} from './state/actions'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {setListName} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	playlistName: makeSelectEditorData(`playlistName`),
	leftGroup: makeSelectEditParam(`leftGroup`),
	rightGroup: makeSelectEditParam(`rightGroup`)
})
const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value)),
	setListName: e => dispatch(setListName(e.target.value))
})

// const withConnect = connect(props, actions)
// const withReducer = injectReducer({
// 	edit: reducer,
// })

// export default compose(
// 	withReducer,
// 	withConnect,
// )(Edit)

export default Component => connect(mapProps, mapActions)(Component)