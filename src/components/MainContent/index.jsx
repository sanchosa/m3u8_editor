import React from 'react'
import styled from 'styled-components'
import {injectIntl} from 'react-intl'
import {Layout, Icon} from 'antd'
import ListEditor from 'containers/ListEditor'
import Menu from 'containers/Menu'
import moment from 'moment'

const {Content, Sider, Footer} = Layout

const StyledLayout = styled(Layout)`
	margin-top: 10px;
	background: #fff;
`
const StyledContent = styled(Content)`
	padding: 24px 50px;
	min-height: calc(100vh - 153px);
`
const StyledFooter = styled(Footer)`
	background: #fff;
	> span {
		float: right;
	}
`
const StyledSider = styled(Sider)`
	background: #fff;
	>.ant-layout-sider-trigger {
		color: #1890ff;
		background: #f0f1f2;
	}
	>.ant-layout-sider-trigger:hover {
		box-shadow: 1px -1px 8px #1890ff;
	}
`

class MainContent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false
		}

		this.onCollapse = this.onCollapse.bind(this)
	}
	onCollapse(collapsed) {
		this.setState({collapsed})
	}
	render() {
		return <StyledLayout>
			<StyledSider collapsible={true} onCollapse={this.onCollapse}>
				<Menu intl={this.props.intl} collapsed={this.state.collapsed}/>
			</StyledSider>
			<StyledLayout>
				<StyledContent>
					<ListEditor intl={this.props.intl}/>
				</StyledContent>
				<StyledFooter>
					<span>
						Copyright © {moment().format(`YYYY`)}. sanchosa <a
							href="https://github.com/sanchosa/m3u8_editor"
							target="_blank"
						>
							<Icon type="github" />
						</a>
					</span>
				</StyledFooter>
			</StyledLayout>
		</StyledLayout>
	}
}

export default injectIntl(MainContent)
