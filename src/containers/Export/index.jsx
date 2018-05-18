import React from 'react'
import connect from './connect'
import Configurator from './content/Configurator'
import Loading from './content/Loading'
import Result from './content/Result'

const Export = props => {
	const Component = props.loading
		? Loading
		: props.data === null
			? Configurator
			: Result

	return <Component {...props}/>
}

export default connect(Export)