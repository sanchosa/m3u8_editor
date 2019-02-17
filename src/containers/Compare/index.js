import React from 'react'
import {Row, Col, Button, Tabs} from 'antd'
import connect from './connect'

const TabPane = Tabs.TabPane

class Compare extends React.Component {
	constructor(props) {
		super(props)

		this.formatMessage = this.formatMessage.bind(this)
	}
	formatMessage(id, params) {
		this.props.intl && this.props.intl.formatMessage({id}, params)
	}
	render() {
		console.log(`render Compare: `, this.props)

		const ApplyButton = <Button type="primary">Apply</Button>

		return <Row>
			<Col span={24}>
				<Tabs defaultActiveKey="new" tabBarExtraContent={ApplyButton}>
					<TabPane tab="Tab 1" key="new">Content of Tab Pane 1</TabPane>
					<TabPane tab="Tab 2" key="lost">Content of Tab Pane 2</TabPane>
				</Tabs>
			</Col>
		</Row>
	}
}

export default connect(Compare)