import React from 'react'
import styled from 'styled-components'
import {Transfer} from 'antd'
import DeleteButton from './content/DeleteChannelButton'
import connect from './connect'

const StyledSpan = styled.span`
	width: 100%;
	display: inline-block;
`

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
		this.deleteChannels = this.deleteChannels.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.leftGroup && this.props.leftGroup !== nextProps.leftGroup) {
			this.setState({sourceSelectedKeys: null})
		}
		if (this.props.rightGroup && this.props.rightGroup !== nextProps.rightGroup) {
			this.setState({targetSelectedKeys: null})
		}
	}
	selectChannel(channel) {
		console.log(`test: `, channel)
		const key = this.props.transferData.get(`targetKeys`).includes(channel.key)
			? `rightChannel`
			: `leftChannel`
		this.props.setValue(key, channel)
	}
	handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
		this.setState({
			sourceSelectedKeys,
			targetSelectedKeys
		})
	}
	deleteChannels(side) {
		const keys = side === `left` ? this.state.sourceSelectedKeys : this.state.targetSelectedKeys
		this.props.deleteChannel && this.props.deleteChannel({
			group: side === `left` ? this.props.leftGroup : this.props.rightGroup,
			keys,
			ids: this.props.transferData.get(`dataSource`)
				.reduce((result, channel) => {
					keys.includes(channel.key) && result.push(channel.id)
					return result
				}, [])
		})
		side === `left`
			? this.setState({sourceSelectedKeys: null})
			: this.setState({targetSelectedKeys: null})
	}
	render() {
		console.log(`render transfer: `, this.state.sourceSelectedKeys)

		const {transferData, ...props} = this.props
		const titles = [
			<DeleteButton
				intl={this.props.intl}
				count={getCount(this.state.sourceSelectedKeys)}
				onConfirm={() => this.deleteChannels(`left`)}
			/>,
			<DeleteButton
				intl={this.props.intl}
				count={getCount(this.state.targetSelectedKeys)}
				onConfirm={() => this.deleteChannels(`right`)}
			/>
		]

		return <Transfer
			{...props}
			showSearch
			dataSource={transferData.get(`dataSource`)}
			targetKeys={transferData.get(`targetKeys`)}
			onSelectChange={this.handleSelectChange}
			// selectedKeys={getSelectedKeys()}
			titles={titles}
			render={item =>
				<StyledSpan onClick={() => this.selectChannel(item)}>
					{item.name}
				</StyledSpan>
			}
		/>
	}
}

export default connect(Component)