import React from 'react'
import randomString from 'randomstring'
import {Row, Col, Button, Tabs, Table} from 'antd'
import {getDefaultColumns, getNewLinksColumns} from './columns'
import connect from './connect'

const TabPane = Tabs.TabPane
const getData = (groups, channels) => groups
	.map((group, name) => ({
		group: name,
		id: randomString.generate(5),
		children: group.map(id => channels.get(id).set(`group`, name))
	}))
	.valueSeq()
	.toJS()

const getContent = ({key, title, columns, channels, groups, selectedKeys, onChange}) => {
	const dataSource = getData(groups, channels)
	console.log(`render Tab: `, title, columns, channels, dataSource)

	return channels.size > 0
		? <TabPane tab={title} key={key}>
			<Table
				pagination={false}
				columns={columns}
				dataSource={getData(groups, channels)}
				rowKey="id"
			/>
		</TabPane>
		: null
}

class Compare extends React.Component {
	constructor(props) {
		super(props)

		this.formatMessage = this.formatMessage.bind(this)
	}
	formatMessage(id, params) {
		return this.props.intl && this.props.intl.formatMessage({id}, params)
	}
	render() {
		console.log(`render Compare: `, this.props.data)

		const {data} = this.props
		const getDefaultKey = () => {
			if (data.get(`newChannels`).size > 0) return `newChannels`
			if (data.get(`newLinks`).size > 0) return `newLinks`

			return `lostChannels`
		}

		const ApplyButton = <Button type="primary">Apply</Button>

		return <Row>
			<Col span={24}>
				<Tabs defaultActiveKey={getDefaultKey()} tabBarExtraContent={ApplyButton}>
					{getContent({
						key: `newChannels`,
						title: this.formatMessage(`compare.tab.newChannels.title`),
						columns: getDefaultColumns(this.formatMessage),
						channels: data.get(`newChannels`),
						groups: data.get(`newChannelsGroups`),
					})}
					{getContent({
						key: `newLinks`,
						title: this.formatMessage(`compare.tab.newLinks.title`),
						columns: getNewLinksColumns(this.formatMessage),
						channels: data.get(`newLinks`),
						groups: data.get(`newLinksGroups`),
					})}
					{getContent({
						key: `lostChannels`,
						title: this.formatMessage(`compare.tab.lostChannels.title`),
						columns: getDefaultColumns(this.formatMessage),
						channels: data.get(`lostChannels`),
						groups: data.get(`lostGroups`),
					})}
				</Tabs>
			</Col>
		</Row>
	}
}

export default connect(Compare)