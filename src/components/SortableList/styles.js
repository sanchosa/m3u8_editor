import styled, {createGlobalStyle} from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'

export const GlobalStyles = createGlobalStyle`
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

export const StyledVirtualList = styled(VirtualList)`
	background: #FFF;
	border-radius: 4px;
	border: 1px solid #d9d9d9;

`
export const Div = styled.div`
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

export const ParentDiv = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.height}px;
	background: #FFF;
	border-radius: 4px;
	border: 1px solid #d9d9d9;
`
export const ChildDiv = styled.div`
	position: relative;
	width: 100%;
	text-align: center;
	top: 50px;
	overflow: visible;
	color: rgba(0, 0, 0, 0.40);
`