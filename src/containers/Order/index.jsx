import React from 'react'
import styled from 'styled-components'
import randomString from 'randomstring'
import {Row, Col, Divider, Input, Icon} from 'antd'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'
import Label from 'components/Picker/Label'
import SortableList from 'components/SortableList'
import connect from './connect'

let searchValue = null
let group = null
const StyledSearch = styled(Input.Search)`
	margin-bottom: 5px;
`
const StyledDivider = styled(Divider)`
	height: 746px;
`
const StyledSpan = styled.span`
	background-color: #ffa50087;
`
const StyledIcon = styled(Icon)`
	cursor: pointer;
	color: #ccc;
	transition: color 0.3s;
	font-size: 12px;

	:hover {
		color: #999;
	}
	:active {
		color: #666;
	}
`

const search = (newValue, original) =>
	newValue && original && original.toLowerCase().includes(newValue.toLowerCase())
const ChannelSorterItem = ({item, number}) =>
	search(searchValue, item.name)
		? <StyledSpan>{number + 1}. <b>{item.name}</b></StyledSpan>
		: <span>{number + 1}. <b>{item.name}</b></span>

const GroupSorterItem = ({item, number}) =>
	<span>{number + 1}. <b>{item}</b></span>

class Order extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			scrollToIndex: null,
			searchIndex: null
			// searchIndex is required for positioning scrollbar to found element again
		}

		this.onSearch = this.onSearch.bind(this)
		this.sortChannel = this.sortChannel.bind(this)
		this.groupChange = this.groupChange.bind(this)
		this.onChange = this.onChange.bind(this)
		this.emitEmpty = this.emitEmpty.bind(this)
	}
	onSearch(value) {
		let pos = null
		let index = null
		if (value && this.props.items) {
			pos = this.props.items.findIndex(item => search(value, item.name)) + 1
			index = randomString.generate()
		}
		this.setState({
			scrollToIndex: pos,
			searchIndex: index
		})
	}
	onChange(e) {
		console.log(e.target.value)
		searchValue = e.target.value
	}
	sortChannel({oldIndex, newIndex}) {
		this.props.sortChannel({oldIndex, newIndex, group})
	}
	groupChange(value) {
		group = value
		this.props.groupChange(value)
	}
	emitEmpty() {
		searchValue = null
		this.setState({
			scrollToIndex: null
			// searchIndex: index
		})
	}
	render() {
		// !!! перекинуть в отдельный компонент, убрать кнопку поиска в префикс, покрыть тестами редюсер
		// const suffix = searchValue ? <StyledIcon key="clear" type="close-circle" onClick={this.emitEmpty}/> : null

		return <Row key="2" type="flex" justify="center">
			<Col span={10}>
				<GroupSelector onChange={this.groupChange} intl={this.props.intl}/>
				<StyledSearch
					enterButton={true}
					placeholder={this.props.intl.formatMessage({id: `order.searchChannel.placeholder`})}
					onSearch={this.onSearch}
					onChange={this.onChange}
					// suffix={suffix}
				/>
				<Label>{this.props.intl.formatMessage({id: `order.channelList.label`})}</Label>
				<SortableList
					height={600}
					items={this.props.items && this.props.items.toArray() || []}
					scrollToIndex={this.state.scrollToIndex}
					scrollToAlignment="center"
					onSortEnd={this.sortChannel}
					placeholder={this.props.intl.formatMessage({id: `order.channelList.placeholder`})}
				>
					<ChannelSorterItem/>
				</SortableList>
			</Col>
			<StyledDivider type="vertical"/>
			<Col span={10}>
				<Label>{this.props.intl.formatMessage({id: `order.groupList.label`})}</Label>
				<SortableList
					height={723}
					items={this.props.groups && this.props.groups.toArray() || []}
					onSortEnd={this.props.sortGroup}
					placeholder={this.props.intl.formatMessage({id: `order.groupList.placeholder`})}
				>
					<GroupSorterItem/>
				</SortableList>
			</Col>
		</Row>
	}
}
export default connect(Order)