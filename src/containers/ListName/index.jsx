import React from 'react'
import {Input} from 'antd'
import connect from './connect'

const ListName = props => {
	const formatMessage = id => props.intl && props.intl.formatMessage({id})

	return <Input
		addonBefore={formatMessage(`edit.playlistName.addon`)}
		defaultValue={props.playlistName}
		onChange={props.setListName}
		placeholder={formatMessage(`edit.playlistName.placeholder`)}
	/>
}

export default connect(ListName)