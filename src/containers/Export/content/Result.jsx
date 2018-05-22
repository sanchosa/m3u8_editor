import React from 'react'
import {Col, Button, Input} from 'antd'
import styled from 'styled-components'
import StyledRow from './StyledRow'

const {TextArea} = Input
const StyledButton = styled(Button)`
	margin-right: 5px;
`
const StyledTextArea = styled(TextArea)`
	overflow: auto !important;
`

export default props => {
	const formatMessage = id =>
		props.intl && props.intl.formatMessage({id})

	return [
		<h1 key="header">
			{formatMessage(`export.result.header`)}
		</h1>,
		<StyledRow key="buttons">
			<Col span={24}>
				<StyledButton>
					{formatMessage(`yes`)}
				</StyledButton>
				{props.readonly === true && <StyledButton
					onClick={() => props.setParam && props.setParam({
						readonly: false
					})}
				>
					{formatMessage(`no`)}
				</StyledButton>}
				<StyledButton
					onClick={() => props.setParam && props.setParam({
						data: null,
						readonly: true
					})}
				>
					{formatMessage(`again`)}
				</StyledButton>
			</Col>
		</StyledRow>,
		<StyledRow key="data">
			<Col span={24}>
				<StyledTextArea autosize="true"
					wrap="off"
					defaultValue={props.data}
					disabled={props.readonly}
				/>
			</Col>
		</StyledRow>
	]
}