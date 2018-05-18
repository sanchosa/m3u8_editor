import React from 'react'
import {Col, Button} from 'antd'
import StyledRow from './StyledRow'
import {StyledSpin} from 'components/Spinner'

export default props => {
	// const formatMessage = id =>
	// 	props.intl && props.intl.formatMessage({id})

	return [
		<h1 key="header">
			Please, wait...
		</h1>,
		<StyledRow key="options">
			<Col span={24}>
				<StyledSpin/>
			</Col>
		</StyledRow>,
		<StyledRow key="buttons">
			<Col span={24}>
				<Button onClick={() => props.stop && props.stop()}>
					Stop
				</Button>
			</Col>
		</StyledRow>
	]
}