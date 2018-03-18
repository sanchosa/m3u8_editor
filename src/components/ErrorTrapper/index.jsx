import React from 'react'

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
		const lines = stack
			.split(/\n/)
			.slice(1)
			.map(line => <li>{line}<br/></li>)
		return (
			<div>
				<h1>🚨 Уии ууу уиииуу, ошибка! 🚨</h1>
				<p>✔ Код ошибки: {code}</p>
				<p>✔ {message}</p>
				<ul>{lines}</ul>
				<button onClick={() => this.clearError()}>Закрыть</button>
			</div>
		)
	}
	render() {
		const hasError = this.props.error.code > 0
		return (
			<div>
				{this.displayError(hasError)}
			</div>
		)
	}
}
