import React from 'react'
import styled from 'styled-components'
import {Layout, Row, Col} from 'antd'
import LanguageSelector from 'containers/LanguageSelector'
import Menu from 'containers/Menu'
import Logo from 'assets/images/Logo.png'

const {Header} = Layout

const StyledHeader = styled(Header)`
	box-shadow: 0px 3px 8px #f0f1f2;
	background: #fff;
`
const StyledImg = styled.img`
	height: 45px;
`

export default props =>
	<StyledHeader>
		<Row type="flex" justify="space-between">
			<Col span={5}><StyledImg src={Logo}/></Col>
			<Col span={15}>
				<Menu intl={props.intl} mode="horizontal"/>
			</Col>
			<Col span={2}><LanguageSelector/></Col>
		</Row>
	</StyledHeader>