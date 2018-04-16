import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
// import {compose} from 'redux'
import {makeSelectEditParam} from './state/selectors'
// import reducer from './reducer'
import {setValue} from './state/actions'
import {makeSelectEditorData, makeSelectGroupNames} from 'containers/ListEditor/state/selectors'
import {
	setListName,
	createGroup,
	deleteGroup,
	editGroup
} from 'containers/ListEditor/state/actions'

const mapProps = createStructuredSelector({
	playlistName: makeSelectEditorData(`playlistName`),
	leftGroup: makeSelectEditParam(`leftGroup`),
	rightGroup: makeSelectEditParam(`rightGroup`),
	groups: makeSelectGroupNames()
})
const mapActions = dispatch => ({
	setValue: (name, value) => dispatch(setValue(name, value)),
	setListName: e => dispatch(setListName(e.target.value)),
	createGroup: value => dispatch(createGroup(value)),
	deleteGroup: value => dispatch(deleteGroup(value)),
	editGroup: data => dispatch(editGroup(data))
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