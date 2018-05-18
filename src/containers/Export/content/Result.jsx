import React from 'react'
import {Col, Button, Input} from 'antd'
import styled from 'styled-components'
import StyledRow from './StyledRow'

const {TextArea} = Input
const StyledButton = styled(Button)`
	margin-right: 5px;
`

export default props => {
	// const formatMessage = id =>
	// 	props.intl && props.intl.formatMessage({id})

	return [
		<h1 key="header">
			Is this OK ?
		</h1>,
		<StyledRow key="buttons">
			<Col span={24}>
				<StyledButton>
					Yes
				</StyledButton>
				{props.readonly === true && <StyledButton
					onClick={() => props.setParam && props.setParam({
						readonly: false
					})}
				>
					No
				</StyledButton>}
				<StyledButton
					onClick={() => props.setParam && props.setParam({
						data: null,
						readonly: true
					})}
				>
					Again
				</StyledButton>
			</Col>
		</StyledRow>,
		<StyledRow key="data">
			<Col span={24}>
				<TextArea autosize="true"
					defaultValue={props.data}
					disabled={props.readonly}
				/>
			</Col>
		</StyledRow>
	]
}