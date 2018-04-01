import React from 'react'
import {notification} from 'antd'

export default class ErrorTrapper extends React.PureComponent {
	constructor(props) {
		super(props)
		this.setError = this.props.onError
	}
	componentDidMount() {
		const setError = this.setError
		window.onerror = (...args) => {
			const error = args[4] || {}
			setError({
				code: 1,
				message: error.message,
				stack: error.stack
			})
		}
	}
	clearError() {
		this.setError({code: 0})
	}
	displayError(hasError) {
		if (!hasError) return null
		const {code, message, stack} = this.props.error
		const config = {
			description: `${stack || ``}`,
			duration: null,
			message: `${code || ``} - ${message}`,
			placement: `topLeft`,
			onClose: () => this.clearError()
		}

		notification[`error`](config)
		return null
	}
	render() {
		const hasError = this.props.error.code > 0
		return this.displayError(hasError)
	}
}
