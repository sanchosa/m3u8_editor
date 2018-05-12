import React from 'react'
import {Input, Icon, Button, Form, Switch, TimePicker, Collapse, Popover} from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import {ChannelRecord} from 'containers/ListEditor/state/schema'
import TimeZone from 'components/TimeZone'
import Content from 'components/PopoverContent'

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
	margin-right: 10px;
`
const StyledTimePicker = styled(TimePicker)`
	width: 100%
`
const StyledPanel = styled(Collapse.Panel)`
	> .ant-collapse-content {
		padding: 0;
	}
`

const calcDuration = momentTime =>
	momentTime.hours() * 3600 +
	momentTime.minutes() * 60 +
	momentTime.seconds()

export default Form.create()(
	class extends React.PureComponent {
		constructor(props) {
			super(props)

			this.state = {
				mode: `edit`,
				channel: null
			}
			this.channel = null

			this.streamChange = this.streamChange.bind(this)
			this.newChannel = this.newChannel.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.cancel = this.cancel.bind(this)
			this.formatMessage = this.formatMessage.bind(this)
		}
		componentWillReceiveProps(nextProps) {
			this.state.mode === `edit` && this.setState({channel: nextProps.channel})
			if (this.props.channel && this.props.group
				&& this.props.group !== nextProps.group) {
				this.props.clearSelected && this.props.clearSelected()
			}
		}
		streamChange(value) {
			const {duration, ...channel} = this.state.channel
			this.setState({
				channel: new ChannelRecord({
					...channel,
					duration: value && -1 || 1
				}).toJS()
			})

		}
		newChannel() {
			this.setState({
				channel: new ChannelRecord().toJS(),
				mode: `add`
			})
			this.props.form.resetFields()
		}
		handleSubmit(e) {
			e.preventDefault()
			this.props.form.validateFields((err, values) => {
				if (!err) {
					let {duration, ...data} = values
					if (duration) {
						duration = calcDuration(duration)
					}

					const payload = {
						channel: {duration, ...data},
						group: this.props.group
					}

					switch (this.state.mode) {
					case `edit`:
						this.props.editChannel && this.props.editChannel({
							id: this.state.channel.id,
							...payload
						})
						break
					case `add`:
						this.props.createChannel && this.props.createChannel(payload)
						break
					}
					this.setState({
						channel: null,
						mode: `edit`
					})
					this.props.channel && this.props.clearSelected && this.props.clearSelected()
				}
			})
		}
		cancel() {
			if (this.state.mode === `add`) {
				this.setState({
					channel: this.props.channel,
					mode: `edit`
				})
			}
			else {
				this.props.clearSelected && this.props.clearSelected()
			}
			this.props.form.resetFields()
		}
		formatMessage(id) {
			return this.props.intl && this.props.intl.formatMessage({id})
		}
		render() {
			const {getFieldDecorator} = this.props.form
			const channel = this.state.channel

			return [<Button key="button" type="primary"
				disabled={!this.props.group} onClick={this.newChannel}
			>
				<Icon type="plus"/>{this.formatMessage(`edit.channel`)}
			</Button>,
			channel && this.props.group
				? <StyledForm key="form" layout="vertical" onSubmit={this.handleSubmit}>
					<StyledFormItem label={this.formatMessage(`edit.channel.title`)}>
						{getFieldDecorator(`name`, {
							rules: [{
								required: true,
								message: `${this.formatMessage(`edit.channel.title.message`)}`
							}],
							initialValue: channel.name
						})(<Input/>)}
					</StyledFormItem>
					<StyledFormItem label={this.formatMessage(`edit.channel.link`)}>
						{getFieldDecorator(`link`, {
							rules: [{
								required: true,
								message: `${this.formatMessage(`edit.channel.link.message`)}`
							}],
							initialValue: channel.link
						})(<TextArea autosize/>)}
					</StyledFormItem>
					<StyledFormItem>
						<Switch
							checked={channel.duration <= 0}
							checkedChildren="stream"
							unCheckedChildren="stream"
							onChange={this.streamChange}
						/>
					</StyledFormItem>
					{channel.duration > 0 &&
						<StyledFormItem label={this.formatMessage(`edit.channel.duration`)}>
							{getFieldDecorator(`duration`, {
								rules: [{
									required: true,
									message: `${this.formatMessage(`edit.channel.duration.message`)}`
								}],
								initialValue: moment(`00:00:00`, `HH:mm:ss`)
									.seconds(channel.duration)
							})(
								<StyledTimePicker
									defaultOpenValue={moment(`00:00:00`, `HH:mm:ss`)}
								/>
							)}
						</StyledFormItem>
					}
					<Collapse bordered={false}>
						<StyledPanel header={this.formatMessage(`edit.channel.collapse.header`)} key="1">
							<StyledFormItem label="tvg-shift">
								{getFieldDecorator(`tvgShift`, {
									initialValue: channel.tvgShift
								})(<TimeZone/>)}
							</StyledFormItem>
							<StyledFormItem label="tvg-name">
								{getFieldDecorator(`tvgName`, {
									initialValue: channel.tvgName
								})(
									<Input
										placeholder={this.formatMessage(`edit.channel.tvgName.placeholder`)}
									/>
								)}
							</StyledFormItem>
							<StyledFormItem label="tvg-logo">
								{getFieldDecorator(`tvgLogo`, {
									initialValue: channel.tvgLogo
								})(<Input/>)}
							</StyledFormItem>
							<StyledFormItem label="audio-track">
								<Popover
									content={
										<Content
											width="300px"
											data={this.formatMessage(`edit.channel.audioTrack.popover`)}
										/>
									}
								>
									{getFieldDecorator(`audioTrack`, {
										initialValue: channel.audioTrack
									})(<Input/>)}
								</Popover>
							</StyledFormItem>
							<StyledFormItem label="Additional directives">
								{getFieldDecorator(`additional`, {
									initialValue: channel.additional
								})(<TextArea autosize/>)}
							</StyledFormItem>
						</StyledPanel>
					</Collapse>
					<StyledButton type="primary" htmlType="submit">
						{this.state.mode === `edit`
							? this.formatMessage(`edit`)
							: this.formatMessage(`add`)
						}
					</StyledButton>
					<StyledButton onClick={this.cancel}>
						{this.formatMessage(`cancel`)}
					</StyledButton>
				</StyledForm>
				: null
			]
		}
	}
)