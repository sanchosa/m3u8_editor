import React from 'react'
import styled from 'styled-components'
import {Layout, Row, Col} from 'antd'
import LanguageSelector from 'containers/LanguageSelector'
import OpenFile from 'containers/OpenFile'

const {Header} = Layout

const StyledHeader = styled(Header)`
	box-shadow: 0px 3px 8px #f0f1f2;
	background: #fff;
`

export default () =>
	<StyledHeader>
		<Row>
			<Col span={2}><OpenFile/></Col>
			<Col span={2} push={20}><LanguageSelector/></Col>
		</Row>
	</StyledHeader>