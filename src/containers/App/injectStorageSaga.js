import {compose} from 'redux'
import injectSaga from 'utils/inject-saga'
import {DAEMON} from 'utils/constants'
import storageSaga from './saga'

export default Component => compose(injectSaga({storage: storageSaga}, DAEMON))(Component)