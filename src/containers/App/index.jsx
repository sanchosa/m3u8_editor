import React from 'react'
import HomePage from 'components/HomePage'
import ErrorTrapper from './ErrorTrapper'
import GlobalStyle from './styles'

const App = () => <React.Fragment>
	<HomePage key="home-page"/>
	<ErrorTrapper key="error-trapper"/>
	<GlobalStyle/>
</React.Fragment>

export default App