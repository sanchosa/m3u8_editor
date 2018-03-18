import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import getInjectors from './reducer-injectors'

export default value => WrappedComponent => {
	const displayName = WrappedComponent.displayName || WrappedComponent.name || `Component`
	class ReducerInjector extends React.Component {
		static WrappedComponent = WrappedComponent;
		static contextTypes = {store: PropTypes.object.isRequired};
		static displayName = displayName;
		injectors = getInjectors(this.context.store);
		componentWillMount() {
			const {injectReducer} = this.injectors
			injectReducer(value)
		}
		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}
