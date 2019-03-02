import React from 'react'
import randomString from 'randomstring'
import {Row, Col, Button, Tabs, Spin} from 'antd'
import getContent from './content'
import {getDefaultColumns, getNewLinksColumns} from './columns'
import connect from './connect'

const getData = (groups, channels) => groups && groups
	.map((group, name) => ({
		group: name,
		id: randomString.generate(8),
		ids: group,
		children: group.map(id => ({...channels.get(id).toJS(), group: name}))
	}))
	.valueSeq()
	.toJS()

const getSelectedKeys = list => list ? list.toJS() : []

const getDefaultKey = data => {
	const ch = data.get(`newChannels`)
	const lk = data.get(`newLinks`)

	if (ch && ch.size > 0) return `newChannels`
	if (lk && lk.size > 0) return `newLinks`

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
			loading: false,
			sourceData: {
				newChannels,
				newChannelsGroups,
				newLinks,
			},
			newChannelsDataSource: data ? getData(newChannelsGroups, newChannels) : [],
			newLinksDataSource: data ? getData(newLinksGroups, newLinks) : [],
			lostChannelsDataSource: data ? getData(lostChannelsGroups, lostChannels) : [],
		}

		this.setKeys = this.setKeys.bind(this)
		this.deselect = this.deselect.bind(this)
		this.setValues = this.setValues.bind(this)
		this.apply = this.apply.bind(this)
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
	apply() {
		this.setState({loading: true})

		return this.props.applyCompare && this.props.applyCompare({
			selectedNewChannels: this.props.selectedNewChannels,
			selectedNewLinks: this.props.selectedNewLinks,
			selectedLostChannels: this.props.selectedLostChannels,
			...this.state.sourceData,
		})
	}
	formatMessage(id, params) {
		return this.props.intl && this.props.intl.formatMessage({id}, params)
	}
	render() {
		const {data, clearCompare} = this.props

		const extraContent = [
			<Button key="clear" style={{marginRight: `10px`}} onClick={clearCompare}
				disabled={this.state.loading}
			>
				{this.formatMessage(`clear`)}
			</Button>,
			<Button type="primary" key="apply" onClick={this.apply} loading={this.state.loading}>
				{this.formatMessage(`apply`)}
			</Button>,
		]

		return <Row>
			<Col span={24}>
				<Spin spinning={this.state.loading}>
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
							onDeselect: (ids, result) =>
								this.deselect(ids, result, `selectedLostChannels`),
						})}
					</Tabs>
				</Spin>
			</Col>
		</Row>
	}
}

export default connect(Compare)