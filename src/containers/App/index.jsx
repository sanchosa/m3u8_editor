import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePage from 'components/HomePage'
import NotFoundPage from 'components/NotFoundPage/Loadable'
import ErrorTrapper from './ErrorTrapper'

export default () => [
	<Switch key="switch">,
		<Route exact path="/" component={HomePage}/>
		<Route path="/nopage" component={NotFoundPage}/>
	</Switch>,
	<ErrorTrapper key="error-trapper"/>
]
