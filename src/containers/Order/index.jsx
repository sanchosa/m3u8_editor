import React from 'react'
import styled from 'styled-components'
import randomString from 'randomstring'
import {Row, Col, Divider} from 'antd'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'
import Label from 'components/Picker/Label'
import SortableList from 'components/SortableList'
import SearchInput from 'components/SearchInput'
import connect from './connect'

let searchValue = null
let group = null
let scrollOffset = {
	channel: null,
	group: null
}

const Wrapper = styled.div`
	padding-bottom: 5px !important;
`
const StyledDivider = styled(Divider)`
	height: calc(100vh - 167px);
`
const StyledSpan = styled.span`
	background-color: #ffa50087;
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
			search: searchValue,
			scrollToIndex: null,
			searchIndex: null
			// searchIndex is required for positioning scrollbar to found element again
		}

		this.onSearch = this.onSearch.bind(this)
		this.sortChannel = this.sortChannel.bind(this)
		this.groupChange = this.groupChange.bind(this)
		this.emitEmpty = this.emitEmpty.bind(this)
		this.onChannelListScroll = this.onChannelListScroll.bind(this)
		this.onGroupListScroll = this.onGroupListScroll.bind(this)
		this.sortGroup = this.sortGroup.bind(this)
		this.formatMessage = this.formatMessage.bind(this)
	}
	onSearch(value) {
		searchValue = value
		let pos = null
		let index = null
		if (value && this.props.items) {
			pos = this.props.items.findIndex(item => search(value, item.name)) + 1
			index = randomString.generate()
			scrollOffset.channel = null
		}
		this.setState({
			scrollToIndex: pos,
			searchIndex: index,
			search: value
		})
	}
	emitEmpty() {
		searchValue = null
		this.setState({
			scrollToIndex: null,
			searchIndex: null,
			search: null
		})
	}
	sortChannel({oldIndex, newIndex}) {
		this.props.sortChannel({oldIndex, newIndex, group})
	}
	groupChange(value) {
		group = value
		this.props.groupChange(value)
	}
	onChannelListScroll(offset) {
		scrollOffset.channel = offset
		this.state.scrollToIndex !== null && this.setState({scrollToIndex: null})
	}
	onGroupListScroll(offset) {
		scrollOffset.group = offset
	}
	sortGroup({oldIndex, newIndex}) {
		this.props.sortGroup({
			oldIndex: oldIndex + 1,
			newIndex: newIndex + 1
		})
	}
	formatMessage(id) {
		return this.props.intl.formatMessage({id})
	}
	render() {
		return <Row type="flex" justify="center">
			<Col span={10}>
				<GroupSelector
					showSearch
					allowClear
					divider
					defaultValue={this.props.group}
					onChange={this.groupChange}
					intl={this.props.intl}/>
				<Wrapper>
					<SearchInput
						defaultValue={searchValue}
						placeholder={this.formatMessage(`order.searchChannel.placeholder`)}
						onSearch={this.onSearch}
						onClear={this.emitEmpty}
						style={{'margin-bottom': `5px`}}
					/>
				</Wrapper>
				<Label>
					{this.formatMessage(`order.channelList.label`)}
				</Label>
				<SortableList
					height={window.innerHeight - 313}
					items={this.props.items && this.props.items.toArray() || []}
					scrollToIndex={this.state.scrollToIndex}
					scrollToAlignment="center"
					onScroll={this.onChannelListScroll}
					scrollOffset={scrollOffset.channel}
					onSortEnd={this.sortChannel}
					placeholder={this.formatMessage(`order.channelList.placeholder`)}
				>
					<ChannelSorterItem/>
				</SortableList>
			</Col>
			<StyledDivider type="vertical"/>
			<Col span={10}>
				<Label>{this.formatMessage(`order.groupList.label`)}</Label>
				<SortableList
					height={window.innerHeight - 190}
					items={this.props.groups && this.props.groups.toArray() || []}
					onScroll={this.onGroupListScroll}
					scrollOffset={scrollOffset.group}
					onSortEnd={this.sortGroup}
					placeholder={this.formatMessage(`order.groupList.placeholder`)}
				>
					<GroupSorterItem/>
				</SortableList>
			</Col>
		</Row>
	}
}
export default connect(Order)