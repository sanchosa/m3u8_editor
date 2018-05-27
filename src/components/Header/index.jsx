import React from 'react'
import styled from 'styled-components'
import {Layout, Row, Col} from 'antd'
import LanguageSelector from 'containers/LanguageSelector'
import OpenFile from 'containers/OpenFile'
import Menu from 'containers/Menu'

const {Header} = Layout

const StyledHeader = styled(Header)`
	box-shadow: 0px 3px 8px #f0f1f2;
	background: #fff;
`

export default props =>
	<StyledHeader>
		<Row type="flex" justify="space-between">
			<Col span={4}><OpenFile/></Col>
			<Col span={16}>
				<Menu intl={props.intl} mode="horizontal"/>
			</Col>
			<Col span={2}><LanguageSelector/></Col>
		</Row>
	</StyledHeader>