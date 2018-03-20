import React from 'react'
import {Layout, Row, Col} from 'antd'
import LanguageSelector from 'containers/LanguageSelector'

const {Header} = Layout

export default () =>
	<Header>
		<Row>
			<Col span={2} push={22}><LanguageSelector/></Col>
		</Row>
	</Header>