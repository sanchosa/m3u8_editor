import React from 'react'
import {Input, Icon, Button, Form, Switch, TimePicker, Collapse, Popconfirm, Popover} from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import TimeZone from 'components/TimeZone'
import Content from 'components/PopoverContent'

const ButtonGroup = Button.Group
const {TextArea} = Input
const StyledForm = styled(Form)`
	border: 1px solid #d9d9d9;
	padding: 8px;
	margin-top: 10px;
	border-radius: 4px;
`
const StyledFormItem = styled(Form.Item)`
	margin-bottom: 0px;
	> .ant-form-item-label {
	    padding: 0px;
	}
`
const StyledButton = styled(Button)`
	margin-top: 10px;
`
const StyledTimePicker = styled(TimePicker)`
	width: 100%
`
const StyledPanel = styled(Collapse.Panel)`
	> .ant-collapse-content {
		padding: 0;
	}
`

export default Form.create()(
	class extends React.PureComponent {
		constructor(props) {
			super(props)

			this.state = {
				stream: true
			}
			this.streamChange = this.streamChange.bind(this)
			this.formatMessage = this.formatMessage.bind(this)
		}
		streamChange(value) {
			this.setState({stream: value})
		}
		formatMessage(id) {
			return this.props.intl.formatMessage({id})
		}
		render() {
			const {getFieldDecorator} = this.props.form

			return [<ButtonGroup key="buttons">
				<Button type="primary">
					<Icon type="plus"/>
				</Button>
				<Button disabled>
					{this.formatMessage(`edit.channel`)}
				</Button>
				<Popconfirm
					title={this.formatMessage(`edit.channel.delete.confirm.title`)}
					// onConfirm={confirm}
					okType="danger"
					okText={this.formatMessage(`yes`)}
					cancelText={this.formatMessage(`no`)}
				>
					<Button type="danger">
						<Icon type="minus"/>
					</Button>
				</Popconfirm>
			</ButtonGroup>,
			<StyledForm key="form" layout="vertical">
				<StyledFormItem label={this.formatMessage(`edit.channel.title`)}>
					{getFieldDecorator(`name`, {
						rules: [{
							required: true,
							message: `${this.formatMessage(`edit.channel.title.message`)}`
						}]
					})(<Input/>)}
				</StyledFormItem>
				<StyledFormItem label={this.formatMessage(`edit.channel.link`)}>
					{getFieldDecorator(`link`, {
						rules: [{
							required: true,
							message: `${this.formatMessage(`edit.channel.link.message`)}`
						}]
					})(<TextArea autosize/>)}
				</StyledFormItem>
				<StyledFormItem>
					<Switch
						checked={this.state.stream}
						checkedChildren="stream"
						unCheckedChildren="stream"
						onChange={this.streamChange}
					/>
				</StyledFormItem>
				{!this.state.stream &&
					<StyledFormItem label={this.formatMessage(`edit.channel.duration`)}>
						{getFieldDecorator(`duration`)(
							<StyledTimePicker defaultOpenValue={moment(`00:00:00`, `HH:mm:ss`)}/>
						)}
					</StyledFormItem>
				}
				<Collapse bordered={false}>
					<StyledPanel header={this.formatMessage(`edit.channel.collapse.header`)} key="1">
						<StyledFormItem label="tvg-shift">
							{getFieldDecorator(`tvgShift`)(<TimeZone/>)}
						</StyledFormItem>
						<StyledFormItem label="tvg-name">
							{getFieldDecorator(`tvgName`)(
								<Input
									placeholder={this.formatMessage(`edit.channel.tvgName.placeholder`)}
								/>
							)}
						</StyledFormItem>
						<StyledFormItem label="tvg-logo">
							{getFieldDecorator(`tvgLogo`)(<Input/>)}
						</StyledFormItem>
						<StyledFormItem label="audio-track">
							{getFieldDecorator(`audioTrack`)(
								<Popover
									content={
										<Content
											width="300px"
											data={this.formatMessage(`edit.channel.audioTrack.popover`)}
										/>
									}
								>
									<Input/>
								</Popover>
							)}
						</StyledFormItem>
					</StyledPanel>
				</Collapse>
				<StyledButton>
					Ok
				</StyledButton>
			</StyledForm>]
		}
	}
)