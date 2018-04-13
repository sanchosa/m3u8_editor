import {defineMessages} from 'react-intl'

export default defineMessages({
	test: `Test message`,
	listUpload: `Click to Upload`,
	'yes': `Yes`,
	'no': `No`,
	'control.edit': `Edit`,
	'control.edit.popover.content': `Opens the playlist creation panel.
		Allows to manage the elements of the list and distribute the elements into groups.`,
	'control.order': `Order`,
	'control.order.popover.content': `Opens the sort panel.
		Allows to rearrange the order of the list elements and groups.`,
	'control.export': `Export`,
	'control.export.popover.content': `Opens the playlist export panel.
		Allows you to save a formed list.`,
	'listEditor.sorter.groupsSelector.label': `Group`,
	'listEditor.sorter.groupsSelector.placeholder': `Select group`,
	'order.searchChannel.placeholder': `Input channel name`,
	'order.channelList.label': `Channel sorting`,
	'order.channelList.placeholder': `Select group`,
	'order.groupList.label': `Group sorting`,
	'order.groupList.placeholder': `Load list`,
	'edit.playlistName.addon': `Playlist name`,
	'edit.playlistName.placeholder': `Enter playlist name`,
	'edit.group.add.placeholder': `Enter group name`,
	'edit.group.delete.confirm.title': `Delete group ?`,
	'edit.group.delete.button': `Delete group`,
	'edit.channel': `Channel`,
	'edit.channel.delete.confirm.title': `Delete channel ?`,
	'edit.channel.title': `Title`,
	'edit.channel.title.message': `Please, enter the title of the channel`,
	'edit.channel.link': `Link`,
	'edit.channel.link.message': `Please, enter the link of the channel`,
	'edit.channel.duration': `Duration`,
	'edit.channel.duration.message': `Please, enter the duration of the track`,
	'edit.channel.collapse.header': `Additional options`,
	'edit.channel.tvgName.placeholder': `Name for teleguide`,
	'edit.channel.audioTrack.popover': `Audio track definition of this channel, 
		if it's supported by stream. 
		Write language codes in ISO 639-2 standard. 
		You may use several codes separated by comma (e.g.: eng, rus, deu). 
		The first item in the list will be defined as default`
})