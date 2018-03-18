import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import getInjectors from './saga-injectors'

export default (value, mode) => WrappedComponent => {
	const key = Object.keys(value)[0]
	const saga = value[key]
	const displayName = WrappedComponent.displayName || WrappedComponent.name || `Component`
	class InjectSaga extends React.Component {
		static WrappedComponent = WrappedComponent
		static contextTypes = {store: PropTypes.object.isRequired}
		static displayName = `withSaga(${displayName})`
		injectors = getInjectors(this.context.store)
		componentWillMount() {
			const {injectSaga} = this.injectors
			injectSaga(key, {saga, mode}, this.props)
		}
		componentWillUnmount() {
			const {ejectSaga} = this.injectors
			ejectSaga(key)
		}
		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	return hoistNonReactStatics(InjectSaga, WrappedComponent)
}
