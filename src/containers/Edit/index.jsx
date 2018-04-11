import React from 'react'
import {Row, Col, Transfer, Input, Icon, Button} from 'antd'
import styled from 'styled-components'
import SearchInput from 'components/SearchInput'
import ChannelForm from './content/ChannelForm'
import connect from './connect'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'

const gutter = 10
const transferButtonsWidth = 23
const diff = transferButtonsWidth - gutter / 2

const StyledRow = styled(Row)`
	padding-bottom: 10px;
`
const LeftWrapper = styled.div`
	margin-right: ${diff}px;
	width: calc(100% - ${diff}px)
`
const RightWrapper = styled.div`
	margin-left: ${diff}px;
	width: calc(100% - ${diff}px)
`

class Edit extends React.Component {
	constructor(props) {
		super(props)

		console.log(this.props.leftGroup, this.props.rightGroup)
		this.state = {
			value: null,
			newGroupName: null
		}

		this.addNewGroup = this.addNewGroup.bind(this)
	}
	test(e) {
		console.log(e)
		// this.props.setListName()

	}
	addNewGroup(value) {
		console.log(`addNewGroup: `, value)
		this.setState({newGroupName: null})
	}
	render() {
		return [
			<StyledRow key="name" type="flex" gutter={gutter} justify="center">
				<Col span={12}>
					<Input
						addonBefore="Playlist name"
						defaultValue={this.props.playlistName}
						onChange={this.props.setListName}
						placeholder="placeholder"
					/>
				</Col>
			</StyledRow>,
			<Row key="selectors" gutter={gutter}>
				<Col span={6}>
					<SearchInput
						clearOnSearch
						placeholder="Add new group"
						// placeholder={this.formatMessage({id: `edit.newGroup.placeholder`})}
						onSearch={this.addNewGroup}
						enterButton={<Icon type="plus"/>}
					/>
				</Col>
				<Col span={6}>
					<LeftWrapper>
						<GroupSelector
							showSearch
							allowClear
							notitle
							intl={this.props.intl}
							defaultValue={this.props.leftGroup}
							onChange={value => this.props.setValue(`leftGroup`, value)}
						/>
					</LeftWrapper>
				</Col>
				<Col span={6}>
					<RightWrapper>
						<GroupSelector
							showSearch
							allowClear
							notitle
							intl={this.props.intl}
							value={this.props.rightGroup}
							onChange={value => this.props.setValue(`rightGroup`, value)}
						/>
					</RightWrapper>
				</Col>
				<Col span={6}>
					<Button type="danger" disabled={!this.props.rightGroup}>
						Delete group
					</Button>
				</Col>
			</Row>,
			<StyledRow key="edit" gutter={gutter}>
				<Col span={6}>
					<ChannelForm/>
				</Col>
				<Col span={12}>
					<Transfer
						listStyle={{width: `calc(50% - ${transferButtonsWidth}px)`, height: `500px`}}
						showSearch
					/>
				</Col>
				<Col span={6}>
					<ChannelForm/>
				</Col>
			</StyledRow>
		]
	}
}

export default connect(Edit)