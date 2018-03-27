import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'

injectGlobal`
 	.SortableListHelper {
		background: #e6f7ff !important;
		border-radius: 4px !important;
		box-shadow: 
			inset 1px -1px 4px #1890ff, 
			inset -1px 1px 4px #1890ff 
			!important;
	}
`

const StyledVirtualList = styled(VirtualList)`
	background: #FFF;
	border-radius: 4px;
	border: 1px solid #d9d9d9;
`

const Div = styled.div`
	padding: 0 10px;
	box-sizing: border-box;
	border: 1px solid #d9d9d9;
	line-height: 50px;
	background: #fff;

	:hover {
		background: #e6f7ff;
	}
`

export default ({items, onSortEnd, lockToContainerEdges, lockAxis, helperClass, ...props}) => {
	const SortableItem = SortableElement(({item, number, style}) => {
		const childrenWithProps = React.Children.map(props.children, child =>
			React.cloneElement(child, {item, number}))

		return <Div key={number} style={style}>{childrenWithProps}</Div>
	})

	const SortableList = SortableContainer(({items: data}) =>
		<StyledVirtualList
			width='100%'
			height={600}
			itemCount={data.length}
			itemSize={50} // Also supports variable heights (array or function getter)
			renderItem={({index, style}) =>
				<SortableItem
					key={index}
					index={index}
					number={index}
					item={data[index]}
					style={style}
				/>
			}
		/>
	)

	return <SortableList
		items={items}
		onSortEnd={onSortEnd}
		lockToContainerEdges={lockToContainerEdges !== undefined && lockToContainerEdges || true}
		lockAxis={lockAxis || `y`}
		helperClass={helperClass || `SortableListHelper`}
		{...props}
	/>
}