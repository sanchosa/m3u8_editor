import {compose} from 'redux'
import injectSaga from 'utils/inject-saga'
import {DAEMON} from 'utils/constants'
import listEditorSaga from './state/saga'

const withSaga = injectSaga({listEditor: listEditorSaga}, DAEMON)

export default compose(withSaga)