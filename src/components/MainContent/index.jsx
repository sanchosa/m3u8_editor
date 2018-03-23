import React from 'react'
import styled from 'styled-components'
import {Layout} from 'antd'
import ListEditor from 'containers/ListEditor'
import Menu from 'containers/Menu'

const {Content, Sider, Footer} = Layout

const StyledLayout = styled(Layout)`
	margin-top: 10px;
	background: #fff;
`
const StyledContent = styled(Content)`
	padding: 24px 50px;
`
const StyledFooter = styled(Footer)`
	background: #fff;
`

export default () =>
	<StyledLayout>
		<Sider collapsible={true}>
			<Menu/>
		</Sider>
		<StyledLayout>
			<StyledContent>
				<ListEditor/>
			</StyledContent>
			<StyledFooter>
				<span>Footer</span>
			</StyledFooter>
		</StyledLayout>
	</StyledLayout>
