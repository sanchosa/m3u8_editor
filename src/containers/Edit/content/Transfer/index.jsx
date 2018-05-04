import React from 'react'
import styled from 'styled-components'
import {Transfer} from 'antd'
import connect from './connect'

const StyledSpan = styled.span`
	width: 100%;
	display: inline-block;
`

const Component = ({setValue, transferData, ...props}) => {
	const selectChannel = channel => {
		console.log(`test: `, channel)
		const key = transferData.get(`targetKeys`).includes(channel.key)
			? `rightChannel`
			: `leftChannel`
		setValue(key, channel)
	}
	return <Transfer
		{...props}
		showSearch
		dataSource={transferData.get(`dataSource`)}
		targetKeys={transferData.get(`targetKeys`)}
		render={item =>
			<StyledSpan onClick={() => selectChannel(item)}>
				{item.name}
			</StyledSpan>
		}
	/>
}

export default connect(Component)