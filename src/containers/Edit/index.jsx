import React from 'react'
import {Row, Col, Transfer, Input, Icon, Button, Popconfirm, notification} from 'antd'
import styled from 'styled-components'
import SearchInput from 'components/SearchInput'
import ChannelForm from './content/ChannelForm'
import connect from './connect'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'
import ListName from 'containers/ListName'

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
const StyledSpan = styled.span`
	width: 100%;
	display: inline-block;
`

class Edit extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			editGroupValue: this.props.rightGroup,
			newGroupName: null,
			leftChannel: null,
			rightChannel: null
		}

		this.formActions = {
			createChannel: this.props.createChannel,
			editChannel: this.props.editChannel,
			deleteChannel: this.props.deleteChannel
		}

		this.addNewGroup = this.addNewGroup.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.editGroup = this.editGroup.bind(this)
		this.editGroupChange = this.editGroupChange.bind(this)
		this.rightGroupChange = this.rightGroupChange.bind(this)
		this.formatMessage = this.formatMessage.bind(this)
		this.selectChannel = this.selectChannel.bind(this)
		this.clearChannel = this.clearChannel.bind(this)
	}
	addNewGroup(value) {
		notification[`info`]({
			message: this.props.intl.formatMessage({id: `edit.group.add.message`}, {value})
		})
		this.setState({newGroupName: null})
		this.props.setValue(`leftGroup`, value)
		this.props.createGroup(value)
	}
	deleteGroup() {
		this.setState({
			editGroupValue: null
		})
		this.props.deleteGroup(this.props.rightGroup)
	}
	editGroup() {
		if (this.props.groups.includes(this.state.editGroupValue)) {
			return notification[`warning`]({
				message: `Group ${this.state.editGroupValue} allready exists !`
			})
		}

		this.props.editGroup({
			current: this.props.rightGroup,
			newOne: this.state.editGroupValue
		})
	}
	editGroupChange(e) {
		this.setState({
			editGroupValue: e.target.value
		})
	}
	rightGroupChange(value) {
		this.setState({
			editGroupValue: value
		})
		this.props.setValue(`rightGroup`, value)
	}
	selectChannel(channel) {
		console.log(`test: `, channel)
		this.props.transferData.get(`targetKeys`).includes(channel.key)
			? this.setState({rightChannel: channel})
			: this.setState({leftChannel: channel})
	}
	clearChannel(pos) {
		pos === `right`
			? this.setState({rightChannel: null})
			: this.setState({leftChannel: null})
	}
	formatMessage(id) {
		return this.props.intl.formatMessage({id})
	}
	render() {
		// !!!! перекинуть все подключаемые данные непосредственно в нужные компоненты, 
		// для исключения ненужных render 
		console.log(`render all`)
		return [
			<StyledRow key="name" type="flex" gutter={gutter} justify="center">
				<Col span={12}>
					<ListName intl={this.props.intl}/>
				</Col>
			</StyledRow>,
			<Row key="selectors" gutter={gutter}>
				<Col span={6}>
					<SearchInput
						clearOnSearch
						placeholder={this.formatMessage(`edit.group.add.placeholder`)}
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
							value={this.props.leftGroup}
							onChange={value => this.props.setValue(`leftGroup`, value)}
							exclude={[this.props.rightGroup]}
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
							onChange={this.rightGroupChange}
							exclude={[this.props.leftGroup]}
						/>
					</RightWrapper>
				</Col>
				<Col span={6}>
					<Input.Group compact style={{display: `flex`}}>
						<Popconfirm
							title={this.props.intl.formatMessage({
								id: `edit.group.delete.confirm.title`
							}, {
								group: this.props.rightGroup
							})}
							onConfirm={this.deleteGroup}
							okType="danger"
							okText={this.formatMessage(`yes`)}
							cancelText={this.formatMessage(`no`)}
						>
							<Button
								icon="delete"
								type="danger"
								style={{padding: `0 15px`}}
								disabled={!(this.props.rightGroup && this.props.rightGroup !== `none`)}
							/>
						</Popconfirm>
						<Input
							value={this.state.editGroupValue}
							onChange={this.editGroupChange}
							onPressEnter={this.editGroup}
							disabled={!(this.props.rightGroup && this.props.rightGroup !== `none`)}
						/>
						<Button
							icon="edit"
							type="primary"
							style={{padding: `0 15px`}}
							disabled={!(this.props.rightGroup && this.props.rightGroup !== `none`)}
							onClick={this.editGroup}
						/>
					</Input.Group>
				</Col>
			</Row>,
			<StyledRow key="edit" gutter={gutter}>
				<Col span={6}>
					<ChannelForm
						test="left"
						clearSelected={() => this.clearChannel(`left`)}
						intl={this.props.intl}
						group={this.props.leftGroup}
						channel={this.state.leftChannel}
						{...this.formActions}
					/>
				</Col>
				<Col span={12}>
					<Transfer
						listStyle={{width: `calc(50% - ${transferButtonsWidth}px)`, height: `500px`}}
						showSearch
						dataSource={this.props.transferData.get(`dataSource`)}
						targetKeys={this.props.transferData.get(`targetKeys`)}
						render={item =>
							<StyledSpan onClick={() => this.selectChannel(item)}>
								{item.name}
							</StyledSpan>
						}
					/>
				</Col>
				<Col span={6}>
					<ChannelForm
						test="right"
						clearSelected={() => this.clearChannel(`right`)}
						intl={this.props.intl}
						group={this.props.rightGroup}
						channel={this.state.rightChannel}
						{...this.formActions}
					/>
				</Col>
			</StyledRow>
		]
	}
}

export default connect(Edit)