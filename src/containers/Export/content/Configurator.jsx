import React from 'react'
import {Col, Checkbox, Button} from 'antd'
import StyledRow from './StyledRow'

export default props => {
	const formatMessage = id =>
		props.intl && props.intl.formatMessage({id})

	const buildList = () => {
		const {
			playlistNameFlag,
			groupExtentionFlag,
			additionalFlag,
			formatDurationFlag,
			groupTitleFlag,
			tvgShiftFlag,
			tvgNameFlag,
			tvgLogoFlag,
			audioTrackFlag
		} = props
		props.buildList && props.buildList({
			playlistNameFlag,
			groupExtentionFlag,
			additionalFlag,
			formatDurationFlag,
			groupTitleFlag,
			tvgShiftFlag,
			tvgNameFlag,
			tvgLogoFlag,
			audioTrackFlag
		})
	}

	return [
		<h1 key="header">
			{formatMessage(`export.configurator.header`)}
		</h1>,
		<StyledRow key="options">
			<Col span={24}>
				<Checkbox checked={props.playlistNameFlag}
					onChange={() => props.setParam && props.setParam({
						playlistNameFlag: !props.playlistNameFlag
					})}
				>
					{formatMessage(`export.configurator.playlistNameParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.groupExtentionFlag}
					onChange={() => props.setParam && props.setParam({
						groupExtentionFlag: !props.groupExtentionFlag
					})}
				>
					{formatMessage(`export.configurator.groupExtentionParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.additionalFlag}
					onChange={() => props.setParam && props.setParam({
						additionalFlag: !props.additionalFlag
					})}
				>
					{formatMessage(`export.configurator.additionalParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.formatDurationFlag}
					onChange={() => props.setParam && props.setParam({
						formatDurationFlag: !props.formatDurationFlag
					})}
				>
					{formatMessage(`export.configurator.formatDurationParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.groupTitleFlag}
					onChange={() => props.setParam && props.setParam({
						groupTitleFlag: !props.groupTitleFlag
					})}
				>
					{formatMessage(`export.configurator.groupTitleParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.tvgShiftFlag}
					onChange={() => props.setParam && props.setParam({
						tvgShiftFlag: !props.tvgShiftFlag
					})}
				>
					{formatMessage(`export.configurator.tvgShiftParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.tvgNameFlag}
					onChange={() => props.setParam && props.setParam({
						tvgNameFlag: !props.tvgNameFlag
					})}
				>
					{formatMessage(`export.configurator.tvgNameParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.tvgLogoFlag}
					onChange={() => props.setParam && props.setParam({
						tvgLogoFlag: !props.tvgLogoFlag
					})}
				>
					{formatMessage(`export.configurator.tvgLogoParam`)}
				</Checkbox>
				<br/>
				<Checkbox checked={props.audioTrackFlag}
					onChange={() => props.setParam && props.setParam({
						audioTrackFlag: !props.audioTrackFlag
					})}
				>
					{formatMessage(`export.configurator.audioTrackParam`)}
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