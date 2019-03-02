import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {setValues} from './state/actions'
import {applyCompare, clearCompare} from 'containers/ListEditor/state/actions'
import {makeSelectEditorData} from 'containers/ListEditor/state/selectors'
import {makeSelectCompareData} from './state/selectors'

const mapProps = createStructuredSelector({
	selectedNewChannels: makeSelectCompareData(`selectedNewChannels`),
	selectedNewLinks: makeSelectCompareData(`selectedNewLinks`),
	selectedLostChannels: makeSelectCompareData(`selectedLostChannels`),
	data: makeSelectEditorData(`compare`),
})

const mapActions = {
	applyCompare,
	clearCompare,
	setValues,
}

export default Component => connect(mapProps, mapActions)(Component)
