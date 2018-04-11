import React from 'react'
import connect from './connect'
import Order from 'containers/Order'
import Edit from 'containers/Edit'

const Component = props => {
	switch (props.control) {
	case `edit`:
		return <Edit intl={props.intl} key="edit"/>
	case `order`:
		return <Order intl={props.intl} key="order"/>
	case `export`:
		return <span key="export">Export</span>
	default:
		return <span>Editor</span>
	}
}

export default connect(Component)