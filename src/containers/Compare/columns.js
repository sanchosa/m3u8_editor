const getBaseColumns = formatMessage => [
	{
		title: formatMessage(`compare.table.group.title`),
		dataIndex: `group`,
		key: `group`,
	}, {
		title: formatMessage(`compare.table.name.title`),
		dataIndex: `name`,
		key: `name`,
	},
]

export const getDefaultColumns = formatMessage => [
	...getBaseColumns(formatMessage),
	{
		title: formatMessage(`compare.table.link.title`),
		dataIndex: `link`,
		key: `link`,
	},
]

export const getNewLinksColumns = formatMessage => [
	...getBaseColumns(formatMessage),
	{
		title: formatMessage(`compare.table.link.title`),
		dataIndex: `currentLink`,
		key: `currentLink`,
	}, {
		title: formatMessage(`compare.table.newLink.title`),
		dataIndex: `link`,
		key: `link`,
	},
]