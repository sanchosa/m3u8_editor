import React from 'react'
import connect from './connect'
import Order from './content/Order'

const Component = props => {
	switch (props.control) {
	case `edit`:
		return <span key="edit">Editor</span>
	case `order`:
		return <Order key="order"/>
	case `export`:
		return <span key="export">Export</span>
	default:
		return <span>Editor</span>
	}
}

export default connect(Component)