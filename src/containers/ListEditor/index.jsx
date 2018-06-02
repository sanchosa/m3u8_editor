import React from 'react'
import connect from './connect'
import Order from 'containers/Order'
import Edit from 'containers/Edit'
import Export from 'containers/Export'
import Import from 'containers/Import'

const Component = props => {
	switch (props.control) {
	case `import`:
		return <Import intl={props.intl}/>
	case `edit`:
		return <Edit intl={props.intl} key="edit"/>
	case `order`:
		return <Order intl={props.intl} key="order"/>
	case `export`:
		return <Export intl={props.intl} key="export"/>
	default:
		return <span>Tool not found</span>
	}
}

export default connect(Component)