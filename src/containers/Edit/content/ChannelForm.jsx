import React from 'react'
import {Input, Icon, Button, Form, Switch, TimePicker, Collapse} from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import TimeZone from './TimeZone'

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
		}
		streamChange(value) {
			this.setState({stream: value})
		}
		render() {
	      	const {getFieldDecorator} = this.props.form

			return [<ButtonGroup key="buttons">
				<Button type="primary">
					<Icon type="plus"/>
				</Button>
				<Button disabled>
					Channel
				</Button>
				<Button type="danger">
					<Icon type="minus"/>
				</Button>
			</ButtonGroup>,
			<StyledForm key="form" layout="vertical">
				<StyledFormItem label="Title">
					{getFieldDecorator(`name`, {
						rules: [{
							required: true,
							message: `Please input the title of collection!`
						}]
					})(<Input/>)}
				</StyledFormItem>
				<StyledFormItem label="Link">
					{getFieldDecorator(`link`, {
						rules: [{
							required: true,
							message: `Please input the link of collection!`
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
					<StyledFormItem label="length">
						{getFieldDecorator(`duration`)(<StyledTimePicker/>)}
					</StyledFormItem>
				}
				<Collapse bordered={false}>
					<StyledPanel header="Additional options" key="1">
						<StyledFormItem label="tvg-shift">
							{getFieldDecorator(`tvgShift`)(<TimeZone/>)}
						</StyledFormItem>
						<StyledFormItem label="tvg-name">
							{getFieldDecorator(`tvgName`)(<Input/>)}
						</StyledFormItem>
						<StyledFormItem label="tvg-logo">
							{getFieldDecorator(`tvgLogo`)(<Input/>)}
						</StyledFormItem>
						<StyledFormItem label="audio-track">
							{getFieldDecorator(`audioTrack`)(<Input/>)}
						</StyledFormItem>
					</StyledPanel>
				</Collapse>
				<StyledButton>
					OK
				</StyledButton>
			</StyledForm>]
		}
	}
)