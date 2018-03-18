import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import App from 'containers/App'
import configureStore from 'store'
import 'assets/index'

import {LocaleProvider} from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'

const history = createHistory()
const store = configureStore(history)
const MOUNT_NODE = document.getElementById(`root`)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<LocaleProvider locale={ruRU}>
				<App/>
			</LocaleProvider>
		</ConnectedRouter>
	</Provider>,
	MOUNT_NODE
)
