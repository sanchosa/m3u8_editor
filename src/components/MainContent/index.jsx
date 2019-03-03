import React from 'react'
import styled from 'styled-components'
import {Layout, Icon} from 'antd'
import ListEditor from 'containers/ListEditor'
import moment from 'moment'

const {Content, Footer} = Layout

const StyledLayout = styled(Layout)`
	margin-top: 10px;
	background: #fff;
`
const StyledContent = styled(Content)`
	padding: 24px 50px;
	min-height: calc(100vh - 119px);
`
const StyledFooter = styled(Footer)`
	background: #fff;
	padding: 0 50px 24px;
	> span {
		float: right;
	}
`

export default class MainContent extends React.Component {
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
			<StyledContent>
				<ListEditor intl={this.props.intl}/>
			</StyledContent>
			<StyledFooter>
				<span>
					© 2018-{moment().format(`YYYY`)} Created by Sanchosa <a
						href="https://github.com/sanchosa/m3u8_editor"
						target="_blank"
					>
						<Icon type="github" />
					</a>
				</span>
			</StyledFooter>
		</StyledLayout>
	}
}
