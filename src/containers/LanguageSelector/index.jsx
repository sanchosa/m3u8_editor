import React from 'react'
import {Select} from 'antd'
import connect from './connect'

const Option = Select.Option

const LanguageSelector = props =>
	<Select defaultValue={props.value} onChange={props.onChange}>
		<Option value="enUS">English</Option>
		<Option value="ruRU">Русский</Option>
	</Select>

export default connect(LanguageSelector)