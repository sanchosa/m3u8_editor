import React from 'react'
import HomePage from 'components/HomePage'
import ErrorTrapper from './ErrorTrapper'

export default () => [
	<HomePage key="home-page"/>,
	<ErrorTrapper key="error-trapper"/>
]
