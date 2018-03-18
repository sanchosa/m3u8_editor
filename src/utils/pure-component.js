import React from 'react'

export default (fn) => {
	class Wrapper extends React.PureComponent {
		render() {
			// console.log(`render - ${fn.name}`)
			return fn(this.props, this.context)
		}
	}
	// не надо, т.к. подписывает на контекст как и функциональный компонент,
	// так и оболочку-PureComponent; лучше назначать сразу оболочке (снаружи)
	// Wrapper.contextTypes = fn.contextTypes
	Wrapper.displayName = `PureComponent(${fn.name})`
	return Wrapper
}

// Пример использования:
// import { pureComponent } from 'utils/pureComponent'

// const Square = ({ value, onClick }) => {(
//   <button className="square" onClick={onClick}>
//     {value}
//   </button>
// )}

// export default pureComponent(Square)