import React from 'react'
import {injectIntl} from 'react-intl'
import styled from 'styled-components'
import {Layout} from 'antd'
import Header from 'components/Header'
import MainContent from 'components/MainContent'

const StyledLayout = styled(Layout)`
	background: #fff;
`

const HomePage = props =>
	<StyledLayout>
		<Header intl={props.intl}/>
		<MainContent intl={props.intl}/>
	</StyledLayout>

export default injectIntl(HomePage)