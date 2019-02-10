import React from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {
	GlobalStyles,
	StyledVirtualList,
	Div,
	ParentDiv,
	ChildDiv,
} from './styles'

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

	return <React.Fragment>
		{items && items.length > 0
			? <SortableList
				items={items}
				onSortEnd={onSortEnd}
				lockToContainerEdges={lockToContainerEdges !== undefined ? lockToContainerEdges : true}
				lockAxis={lockAxis || `y`}
				helperClass={helperClass || `SortableListHelper`}
				{...props}
			/>
			: <EmptyList height={height} placeholder={placeholder}/>
		}
		<GlobalStyles/>
	</React.Fragment>
}