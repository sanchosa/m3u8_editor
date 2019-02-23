export const getDefaultColumns = formatMessage => [
	{
		title: formatMessage(`compare.table.group.title`),
		dataIndex: `group`,
		key: `group`,
	}, {
		title: formatMessage(`compare.table.name.title`),
		dataIndex: `name`,
		key: `name`,
	}, {
		title: formatMessage(`compare.table.link.title`),
		dataIndex: `link`,
		key: `link`,
	},
]

export const getNewLinksColumns = formatMessage => [
	...getDefaultColumns(formatMessage),
	{
		title: formatMessage(`compare.table.newLink.title`),
		dataIndex: `newLink`,
		key: `newLink`,
	},
]