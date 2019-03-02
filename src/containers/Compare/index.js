import React from 'react'
import randomString from 'randomstring'
import {Row, Col, Button, Tabs} from 'antd'
import getContent from './content'
import {getDefaultColumns, getNewLinksColumns} from './columns'
import connect from './connect'

const getData = (groups, channels) => groups
	.map((group, name) => ({
		group: name,
		id: randomString.generate(8),
		ids: group,
		children: group.map(id => channels.get(id).set(`group`, name))
	}))
	.valueSeq()
	.toJS()

const getSelectedKeys = list => list ? list.toJS() : []

const getDefaultKey = data => {
	if (data.get(`newChannels`).size > 0) return `newChannels`
	if (data.get(`newLinks`).size > 0) return `newLinks`

	return `lostChannels`
}

class Compare extends React.Component {
	constructor(props) {
		super(props)

		const data = props.data

		const newChannels = data && data.get(`newChannels`)
		const newChannelsGroups = data && data.get(`newChannelsGroups`)
		const newLinks = data && data.get(`newLinks`)
		const newLinksGroups = data && data.get(`newLinksGroups`)
		const lostChannels = data && data.get(`lostChannels`)
		const lostChannelsGroups = data && data.get(`lostGroups`)

		this.state = {
			newChannelsDataSource: data ? getData(newChannelsGroups, newChannels) : [],
			newLinksDataSource: data ? getData(newLinksGroups, newLinks) : [],
			lostChannelsDataSource: data ? getData(lostChannelsGroups, lostChannels) : [],
		}

		this.setKeys = this.setKeys.bind(this)
		this.deselect = this.deselect.bind(this)
		this.setValues = this.setValues.bind(this)
		this.formatMessage = this.formatMessage.bind(this)
	}
	pushUnique(result, source) {
		if (!source) return
		if (Array.isArray(source)) {
			source.forEach(item => !result.includes(item) && result.push(item))
			return
		}

		!result.includes(source) && result.push(source)
	}
	setKeys(selectedRowKeys, selectedRows, key) {
		const keys = selectedRows.reduce((result, row) => {
			this.pushUnique(result, row.ids)
			this.pushUnique(result, row.id)
			return result
		}, [])

		this.setValues(key, keys)
	}
	deselect(ids, result, key) {
		const keys = result
			.filter(id => !ids.includes(id) && id.length > 8)

		this.setValues(key, keys)
	}
	setValues(key, data) {
		const values = {}
		values[key] = data

		this.props.setValues && this.props.setValues(values)
	}
	formatMessage(id, params) {
		return this.props.intl && this.props.intl.formatMessage({id}, params)
	}
	render() {
		const {data, applyCompare, clearCompare} = this.props

		const extraContent = [
			<Button key="clear" style={{marginRight: `10px`}} onClick={clearCompare}>
				{this.formatMessage(`clear`)}
			</Button>,
			<Button type="primary" key="apply" onClick={applyCompare}>
				{this.formatMessage(`apply`)}
			</Button>,
		]

		return <Row>
			<Col span={24}>
				<Tabs defaultActiveKey={getDefaultKey(data)} tabBarExtraContent={extraContent}>
					{getContent({
						key: `newChannels`,
						formatMessage: this.formatMessage,
						columns: getDefaultColumns(this.formatMessage),
						dataSource: this.state.newChannelsDataSource,
						selectedKeys: getSelectedKeys(this.props.selectedNewChannels),
						onChange: (keys, rows) => this.setKeys(keys, rows, `selectedNewChannels`),
						onDeselect: (ids, result) => this.deselect(ids, result, `selectedNewChannels`),
					})}
					{getContent({
						key: `newLinks`,
						formatMessage: this.formatMessage,
						columns: getNewLinksColumns(this.formatMessage),
						dataSource: this.state.newLinksDataSource,
						selectedKeys: getSelectedKeys(this.props.selectedNewLinks),
						onChange: (keys, rows) => this.setKeys(keys, rows, `selectedNewLinks`),
						onDeselect: (ids, result) => this.deselect(ids, result, `selectedNewLinks`),
					})}
					{getContent({
						key: `lostChannels`,
						formatMessage: this.formatMessage,
						columns: getDefaultColumns(this.formatMessage),
						dataSource: this.state.lostChannelsDataSource,
						selectedKeys: getSelectedKeys(this.props.selectedLostChannels),
						onChange: (keys, rows) => this.setKeys(keys, rows, `selectedLostChannels`),
						onDeselect: (ids, result) => this.deselect(ids, result, `selectedLostChannels`),
					})}
				</Tabs>
			</Col>
		</Row>
	}
}

export default connect(Compare)