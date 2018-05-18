import React from 'react'
import {Col, Checkbox, Button} from 'antd'
import StyledRow from './StyledRow'

export default props => {
	// const formatMessage = id =>
	// 	props.intl && props.intl.formatMessage({id})

	const buildList = () => {
		const {groupTitleFlag, groupExtentionFlag} = props
		props.buildList && props.buildList({groupTitleFlag, groupExtentionFlag})
	}

	return [
		<h1 key="header">
			Please, select options
		</h1>,
		<StyledRow key="options">
			<Col span={24}>
				<Checkbox checked={props.groupTitleFlag}
					onChange={() => props.setParam && props.setParam({
						groupTitleFlag: !props.groupTitleFlag
					})}
				>
					Put group name into channel's group-title param
				</Checkbox>
				<br/>
				<Checkbox checked={props.groupExtentionFlag}
					onChange={() => props.setParam && props.setParam({
						groupExtentionFlag: !props.groupExtentionFlag
					})}
				>
					Put group name into channel's #EXTGRP directive
				</Checkbox>
			</Col>
		</StyledRow>,
		<StyledRow key="buttons">
			<Col span={24}>
				<Button type="primary" onClick={buildList}>Build</Button>
			</Col>
		</StyledRow>
	]
}