import React from 'react'
import {Radio, Checkbox, Row, Col, Tooltip, Button, message, Spin} from 'antd'
import styled from 'styled-components'
import {DragFile} from 'components/OpenFile'
import connect from './connect'

const RadioGroup = Radio.Group
const StyledRow = styled(Row)`
	margin-bottom: 20px;
`
const StyledButton = styled(Button)`
	margin-left: 10px;
	display: inline-block;
`
const StyledDiv = styled.div`
	display: inline-block;
	vertical-align: middle;
	max-width: calc(100% - 42px);
	white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
`

class Import extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			method: `new`,
		}

		this.radioChange = this.radioChange.bind(this)
		this.eventChange = this.eventChange.bind(this)
		this.formatMessage = this.formatMessage.bind(this)
	}
	radioChange(method) {
		this.setState({method})
	}
	eventChange({file}) {
		`status` in file && file.status === `done` && message.success(this.formatMessage(
			`import.dragFile.message.success`, {name: file.name}))
	}
	formatMessage(id, params) {
		return this.props.intl && this.props.intl.formatMessage({id}, {...params})
	}
	render() {
		const {loadNewList, compareList, channelsSize, ...props} = this.props
		const customRequest = this.state.method === `new` ? loadNewList : compareList

		const {name, date} = this.props.storageInfo && this.props.storageInfo.toJS()
		const label = name
			? `import.loadNamedStorageList.text`
			: `import.loadNoNamedStorageList.text`

		const options = [
			{label: this.formatMessage(`import.radio.newList`), value: `new`},
			{label: this.formatMessage(`import.radio.compareList`), value: `compare`,
				disabled: channelsSize === 0,
			},
		]

		return <Spin spinning={this.props.loading}>
			<StyledRow key="row">
				<Col span={12}>
					<h3>{this.formatMessage(`import.radio.header`)}</h3>
					<RadioGroup key="radio"
						options={options}
						defaultValue={this.state.method}
						onChange={this.radioChange}
					/>
				</Col>
				<Col span={12}>
					<h3>{this.formatMessage(`import.useLocalStorageHeader`)}</h3>
					<Checkbox defaultChecked={this.props.storageFlag}
						onChange={this.props.setStorageFlag}
					>
						{this.formatMessage(`import.useLocalStorage`)}
					</Checkbox>
					<br/>
					{this.props.storageInfo.size > 0 && [
						<Tooltip mouseEnterDelay={2} key="tooltip"
							title={this.formatMessage(label, {name, date})}
							placement="bottom"
						>
							<StyledDiv key="text">
								{this.formatMessage(label, {name, date})}
							</StyledDiv>
						</Tooltip>,
						<StyledButton key="delete" type="danger" shape="circle" icon="delete"
							onClick={this.props.removeStorageList}
						/>
					]}
				</Col>
			</StyledRow>
			<DragFile key="dragFile"
				customRequest={customRequest}
				onChange={this.eventChange}{...props}
				disabled={this.props.loading}
			/>
		</Spin>
	}
}

export default connect(Import)
