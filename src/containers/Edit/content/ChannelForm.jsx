import React from 'react'
import {Input, Icon, Button, Form, Switch, TimePicker, Collapse, Popconfirm, Popover} from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import {ChannelRecord} from 'containers/ListEditor/state/schema'
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
				channel: null // this.props.channel
			}
			if (this.state.mode === `edit`) {
				this.state.channel = this.props.channel
			}
			this.streamChange = this.streamChange.bind(this)
			this.newChannel = this.newChannel.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.cancel = this.cancel.bind(this)
			this.formatMessage = this.formatMessage.bind(this)
		}
		streamChange(value) {
			this.setState({channel: {
				duration: value && -1 || 1
			}})
		}
		newChannel() {
			this.setState({
				channel: new ChannelRecord(),
				mode: `add`
			})
		}
		handleSubmit(e) {
			e.preventDefault()
			this.props.form.validateFields((err, values) => {
				if (!err) {
					console.log(`Received values of form: `, values)

					let {duration, ...data} = values
					if (duration) {
						duration = calcDuration(duration)
					}

					this.props.createChannel && this.props.createChannel({
						channel: {duration, ...data},
						group: this.props.group
					})

					this.setState({
						channel: this.props.channel,
						mode: `edit`
					})
				}
			})
		}
		cancel() {
			this.setState({
				channel: this.props.channel,
				mode: `edit`
			})
		}
		formatMessage(id) {
			return this.props.intl.formatMessage({id})
		}
		render() {
			const {getFieldDecorator} = this.props.form

			return [<ButtonGroup key="buttons">
				<Button type="primary" disabled={!this.props.group} onClick={this.newChannel}>
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
					<Button type="danger"
						disabled={!(this.state.channel && this.state.mode === `edit`)}
					>
						<Icon type="delete"/>
					</Button>
				</Popconfirm>
			</ButtonGroup>,
			this.state.channel && this.props.group
				? <StyledForm key="form" layout="vertical" onSubmit={this.handleSubmit}>
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
							checked={this.state.channel.duration <= 0}
							checkedChildren="stream"
							unCheckedChildren="stream"
							onChange={this.streamChange}
						/>
					</StyledFormItem>
					{this.state.channel.duration > 0 &&
						<StyledFormItem label={this.formatMessage(`edit.channel.duration`)}>
							{getFieldDecorator(`duration`, {
								rules: [{
									required: true,
									message: `${this.formatMessage(`edit.channel.duration.message`)}`
								}],
								initialValue: moment(`00:00:00`, `HH:mm:ss`)
									.seconds(this.state.channel.duration)
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
							<StyledFormItem label="Additional directives">
								{getFieldDecorator(`additional`)(<TextArea autosize/>)}
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