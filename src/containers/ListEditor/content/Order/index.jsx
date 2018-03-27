import React from 'react'
import SortableList from 'components/SortableList'
import connect from './connect'

const ChannelSorterItem = ({item, number}) =>
	<span>{number + 1}. <b>{item.name}</b></span>

const Order = props => {
	return <SortableList items={props.items.toArray()}>
		<ChannelSorterItem/>
	</SortableList>
}

export default connect(Order)