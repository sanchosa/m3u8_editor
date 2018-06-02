import React from 'react'
import {Radio, Checkbox, Row, Col} from 'antd'
import styled from 'styled-components'
import {DragFile} from 'components/OpenFile'
import connect from './connect'

const RadioGroup = Radio.Group
const StyledRow = styled(Row)`
	margin-bottom: 20px;
`

class Import extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			method: `new`
		}

		this.formatMessage = this.formatMessage.bind(this)
	}
	radioChange(value) {
		console.log(value)
	}
	formatMessage(id) {
		return this.props.intl && this.props.intl.formatMessage({id})
	}
	render() {
		const {loadNewList, compareList, ...props} = this.props
		const customRequest = this.state.method === `new` ? loadNewList : compareList

		const options = [
			{label: this.formatMessage(`import.radio.newList`), value: `new`},
			{label: this.formatMessage(`import.radio.compareList`), value: `compare`, disabled: true}
		]

		return [
			<StyledRow key="row">
				<Col span={12}>
					<h3>{this.formatMessage(`import.radio.header`)}</h3>
					<RadioGroup key="radio"
						options={options}
						value={this.state.method}
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
				</Col>
			</StyledRow>,
			<DragFile key="dragFile" customRequest={customRequest} {...props}/>
		]
	}
}

export default connect(Import)
