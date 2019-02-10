import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from 'store'
import 'assets/index'

import IntlApp from 'containers/IntlApp'

const store = configureStore()
const MOUNT_NODE = document.getElementById(`root`)

ReactDOM.render(
	<Provider store={store}>
		<IntlApp/>
	</Provider>,
	MOUNT_NODE
)