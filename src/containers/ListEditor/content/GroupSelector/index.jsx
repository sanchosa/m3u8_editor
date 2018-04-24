import React from 'react'
import styled from 'styled-components'
import {Select, Divider} from 'antd'
import Picker from 'components/Picker'
import connect from './connect'

const Option = Select.Option

const StyledSelector = styled(Select)`
	width: 100%;
`
const StyledDivider = styled(Divider)`
	margin: 15px 0;
`

const GroupSelector = ({notitle, title, intl, items, divider, placeholder, exclude, ...props}) =>
	<Picker
		title={notitle
			? null
			: title || intl.formatMessage({id: `listEditor.sorter.groupsSelector.label`})}
	>
		<StyledSelector
			placeholder={placeholder || intl.formatMessage({
				id: `listEditor.sorter.groupsSelector.placeholder`
			})}
			{...props}
		>
			{items && items.map((groupName, index) =>
				exclude && exclude.includes(groupName)
					? null
					: <Option key={index} value={groupName}>{groupName}</Option>
			)}
		</StyledSelector>
		{divider && <StyledDivider/>}
	</Picker>

export default connect(GroupSelector)