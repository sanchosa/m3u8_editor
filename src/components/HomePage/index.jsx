import React from 'react'
import styled from 'styled-components'
import {Layout} from 'antd'
import Header from 'components/Header'
import MainContent from 'components/MainContent'

const StyledLayout = styled(Layout)`
	background: #fff;
`

export default () =>
	<StyledLayout>
		<Header/>
		<MainContent/>
	</StyledLayout>
