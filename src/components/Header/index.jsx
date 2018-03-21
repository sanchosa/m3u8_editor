import React from 'react'
import {Layout, Row, Col} from 'antd'
import LanguageSelector from 'containers/LanguageSelector'
import OpenFile from 'containers/OpenFile'

const {Header} = Layout

export default () =>
	<Header>
		<Row>
			<Col span={2}><OpenFile/></Col>
			<Col span={2} push={20}><LanguageSelector/></Col>
		</Row>
	</Header>