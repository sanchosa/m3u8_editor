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
	let a = null
	const setARef = element => a = element
	const saveFile = () => {
		// first method, filename will be default
		// const uriContent = `data:application/octet-stream,${encodeURIComponent(props.data)}`
		// window.open(uriContent, `Save playlist`)

		// second method throught <a href/> with download param
		a && a.click()
	}
	const formatMessage = id =>
		props.intl && props.intl.formatMessage({id})
	const getFileName = () =>
		props.listName
			? `${props.listName.replace(/[\s\\/]/gi, `_`)}.m3u8`
			: `${formatMessage(`export.defaultListName`)}.m3u8`

	return [
		<h1 key="header">
			{formatMessage(`export.result.header`)}
		</h1>,
		<StyledRow key="buttons">
			<Col span={24}>
				<StyledButton
					type="primary"
					onClick={saveFile}
				>
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
				<a href={`data:application/octet-stream,${encodeURIComponent(props.data)}`}
					ref={setARef}
					download={getFileName()}
				/>
				<StyledTextArea autosize="true"
					wrap="off"
					defaultValue={props.data}
					disabled={props.readonly}
					onChange={e => props.setParam && props.setParam({
						data: e.target.value
					})}
				/>
			</Col>
		</StyledRow>
	]
}