import React from 'react'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'

export default props =>
	<GroupSelector
		showSearch
		allowClear
		notitle
		{...props}
	/>
