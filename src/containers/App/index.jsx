import React from 'react'
import HomePage from 'components/HomePage'
import ErrorTrapper from './ErrorTrapper'
import injectStorageSaga from './injectStorageSaga'

const App = () => [
	<HomePage key="home-page"/>,
	<ErrorTrapper key="error-trapper"/>
]

export default injectStorageSaga(App)