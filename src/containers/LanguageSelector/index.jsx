import React from 'react'
import {Select} from 'antd'
import connect from './connect'

const Option = Select.Option

const LanguageSelector = props =>
	<Select defaultValue="enUS" onChange={props.onChange}>
		<Option value="enUS">ENG</Option>
		<Option value="ruRU">RUS</Option>
	</Select>

export default connect(LanguageSelector)