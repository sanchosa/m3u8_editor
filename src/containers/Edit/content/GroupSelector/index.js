import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {makeSelectEditParam} from 'containers/Edit/state/selectors'
import {setValue} from 'containers/Edit/state/actions'
import Selector from './Selector'

const leftProps = createStructuredSelector({
	value: makeSelectEditParam(`leftGroup`),
	exclude: makeSelectEditParam(`rightGroup`)
})
const rightProps = createStructuredSelector({
	exclude: makeSelectEditParam(`leftGroup`),
	value: makeSelectEditParam(`rightGroup`)
})
const mapActions = group => dispatch => ({
	onChange: value => dispatch(setValue(group, value))
})

export const LeftGroupSelector = connect(leftProps, mapActions(`leftGroup`))(Selector)
export const RightGroupSelector = connect(rightProps, mapActions(`rightGroup`))(Selector)