import {createSelector} from 'reselect'

const selectCompareDomain = (state) => state.get(`compare`)
const makeSelectCompare = () => createSelector(
	selectCompareDomain,
	substate => substate
)

export default makeSelectCompare
export {
  selectCompareDomain,
}
