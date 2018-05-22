import React from 'react'
import {Col, Checkbox, Button} from 'antd'
import StyledRow from './StyledRow'

export default props => {
	const formatMessage = id =>
		props.intl && props.intl.formatMessage({id})

	const buildList = () => {
		const {groupTitleFlag, groupExtentionFlag} = props
		props.buildList && props.buildList({groupTitleFlag, groupExtentionFlag})
	}

	return [
		<h1 key="header">
			{formatMessage(`export.configurator.header`)}
		</h1>,
		<StyledRow key="options">
			<Col span={24}>
				<Checkbox checked={props.groupTitleFlag}
					onChange={() => props.setParam && props.setParam({
						groupTitleFlag: !props.groupTitleFlag
					})}
				>
					{formatMessage(`export.configurator.groupTitleParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.groupExtentionFlag}
					onChange={() => props.setParam && props.setParam({
						groupExtentionFlag: !props.groupExtentionFlag
					})}
				>
					{formatMessage(`export.configurator.groupExtentionParam`)}
				</Checkbox>
			</Col>
		</StyledRow>,
		<StyledRow key="buttons">
			<Col span={24}>
				<Button type="primary" onClick={buildList}>{formatMessage(`build`)}</Button>
			</Col>
		</StyledRow>
	]
}