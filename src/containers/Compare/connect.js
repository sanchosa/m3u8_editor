import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setValues} from './state/actions'
import {applyCompare} from 'containers/ListEditor/state/actions'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {makeSelectCompareData} from './state/selectors'

const mapProps = createStructuredSelector({
	selectedNewKeys: makeSelectCompareData(`selectedNewKeys`),
	selectedLostKeys: makeSelectCompareData(`selectedLostKeys`),
	data: makeSelectEditorData(`compare`),
})

const mapActions = {
	applyCompare,
	setValues,
}

export default Component => connect(mapProps, mapActions)(Component)
