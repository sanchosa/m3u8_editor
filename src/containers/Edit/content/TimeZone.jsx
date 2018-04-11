import React from 'react'
import {Select} from 'antd'

const Option = Select.Option
const options = []
for (let i = -12; i <= 12; i++) {
	options.push(`${i > 0 ? `+` : ``}${i}`)
}

export default class extends React.Component {
	render() {
		return <Select {...this.props}>
			{options.map(value =>
				<Option key={value} value={value}>{`${value}`}</Option>
			)}
		</Select>
	}
}