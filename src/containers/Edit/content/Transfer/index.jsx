import React from 'react'
import {Transfer} from 'antd'
import {DeleteButton, CopyButton} from './content/ChannelButtons'
import connect from './connect'

const getCount = data =>
	Array.isArray(data) ? data.length : 0

class Component extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			sourceSelectedKeys: null,
			targetSelectedKeys: null
		}

		this.selectChannel = this.selectChannel.bind(this)
		this.getUpdates = this.getUpdates.bind(this)
		this.deleteChannels = this.deleteChannels.bind(this)
		this.moveChannels = this.moveChannels.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.getSelectedKeys = this.getSelectedKeys.bind(this)
		this.renderItem = this.renderItem.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.leftGroup && this.props.leftGroup !== nextProps.leftGroup) {
			this.setState({sourceSelectedKeys: null})
		}
		if (this.props.rightGroup && this.props.rightGroup !== nextProps.rightGroup) {
			this.setState({targetSelectedKeys: null})
		}
	}
	selectChannel(key, id) {
		const channel = this.props.transferData.get(`dataSource`).find(item => item.id === id)

		this.props.setValue(key, channel)
	}
	getUpdates(updatedData, stateData, key) {
		let current = []
		let updated = []

		if (stateData &&
			stateData.length < updatedData.length) {
			current = stateData
			updated = updatedData
		}
		else {
			current = updatedData
			updated = stateData
		}

		const channels = stateData
			? updated.filter(item =>
				!current.includes(item))
			: updatedData
		channels.length > 0 && this.selectChannel(key, channels[0])
	}
	handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
		this.getUpdates(sourceSelectedKeys, this.state.sourceSelectedKeys, `leftChannel`)
		this.getUpdates(targetSelectedKeys, this.state.targetSelectedKeys, `rightChannel`)

		this.setState({
			sourceSelectedKeys,
			targetSelectedKeys
		})
	}
	deleteChannels(side) {
		this.props.deleteChannel && this.props.deleteChannel({
			group: side === `left` ? this.props.leftGroup : this.props.rightGroup,
			ids: side === `left` ? this.state.sourceSelectedKeys : this.state.targetSelectedKeys
		})
		side === `left`
			? this.setState({sourceSelectedKeys: null})
			: this.setState({targetSelectedKeys: null})
	}
	getSelectedKeys() {
		const result = []
		this.state.sourceSelectedKeys && result.push(...this.state.sourceSelectedKeys)
		this.state.targetSelectedKeys && result.push(...this.state.targetSelectedKeys)
		return result
	}
	filterOption(inputValue, option) {
		return option.name.toLowerCase().includes(inputValue.toLowerCase())
	}
	copyChannels(side) {
		this.props.copyChannel && this.props.copyChannel({
			group: side === `left` ? this.props.rightGroup : this.props.leftGroup,
			ids: side === `left` ? this.state.sourceSelectedKeys : this.state.targetSelectedKeys
		})
	}
	moveChannels(targetKeys, direction, ids) {
		this.props.rightGroup && this.props.leftGroup &&
		this.props.moveChannel && this.props.moveChannel({
			from: direction === `right` ? this.props.leftGroup : this.props.rightGroup,
			ids,
			to: direction === `right` ? this.props.rightGroup : this.props.leftGroup
		})
	}
	renderItem(item) {
		return {
			label: item.name, // for displayed item
			value: item.link, // for hint
		}
	}
	render() {
		const {transferData, ...props} = this.props
		const titles = [
			[
				<CopyButton
					key="l-copy"
					disabled={getCount(this.state.sourceSelectedKeys) === 0}
					onClick={() => this.copyChannels(`left`)}
				/>,
				<DeleteButton
					key="l-delete"
					intl={this.props.intl}
					count={getCount(this.state.sourceSelectedKeys)}
					onConfirm={() => this.deleteChannels(`left`)}
				/>
			], [
				<CopyButton
					key="r-copy"
					disabled={getCount(this.state.targetSelectedKeys) === 0}
					onClick={() => this.copyChannels(`right`)}
				/>,
				<DeleteButton
					key="r-delete"
					intl={this.props.intl}
					count={getCount(this.state.targetSelectedKeys)}
					onConfirm={() => this.deleteChannels(`right`)}
				/>
			]
		]

		return <Transfer
			{...props}
			rowKey={record => record.id}
			showSearch
			dataSource={transferData.get(`dataSource`)}
			targetKeys={transferData.get(`targetKeys`)}
			onSelectChange={this.handleSelectChange}
			selectedKeys={this.getSelectedKeys()}
			titles={titles}
			filterOption={this.filterOption}
			onChange={this.moveChannels}
			render={this.renderItem}
		/>
	}
}

export default connect(Component)