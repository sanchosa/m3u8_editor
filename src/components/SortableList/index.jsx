import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'

injectGlobal`
 	.SortableListHelper {
 		cursor: n-resize !important;
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
	cursor: n-resize;

	:hover {
		background: #e6f7ff;
	}
`

const ParentDiv = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.height}px;
	background: #FFF;
	border-radius: 4px;
	border: 1px solid #d9d9d9;
`
const ChildDiv = styled.div`
	position: relative;
	width: 100%;
	text-align: center;
	top: 50px;
	overflow: visible;
	color: rgba(0, 0, 0, 0.40);
`

const EmptyList = ({height, placeholder}) =>
	<ParentDiv height={height}>
		<ChildDiv height={height}>
			<b>{placeholder}</b>
		</ChildDiv>
	</ParentDiv>

export default ({
	items, onSortEnd, lockToContainerEdges, lockAxis, placeholder, onScroll, scrollOffset,
	helperClass, height, scrollToIndex, scrollToAlignment, ...props}) => {

	const SortableItem = SortableElement(({item, number, style}) => {
		const childrenWithProps = React.Children.map(props.children, child =>
			React.cloneElement(child, {item, number}))

		return <Div key={number} style={style}>{childrenWithProps}</Div>
	})

	const SortableList = SortableContainer(({items: data}) =>
		<StyledVirtualList
			width='100%'
			height={height}
			itemCount={data.length}
			itemSize={50} // Also supports variable heights (array or function getter)
			scrollToIndex={scrollToIndex}
			scrollToAlignment={scrollToAlignment || `auto`}
			onScroll={onScroll}
			scrollOffset={scrollOffset}
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

	return items && items.length > 0
		? <SortableList
			items={items}
			onSortEnd={onSortEnd}
			lockToContainerEdges={lockToContainerEdges !== undefined && lockToContainerEdges || true}
			lockAxis={lockAxis || `y`}
			helperClass={helperClass || `SortableListHelper`}
			{...props}
		/>
		: <EmptyList height={height} placeholder={placeholder}/>
}