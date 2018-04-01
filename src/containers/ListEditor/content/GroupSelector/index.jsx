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

const GroupSelector = props =>
	<Picker
		title={props.notitle
			? null
			: props.title || props.intl.formatMessage({id: `listEditor.sorter.groupsSelector.label`})}
	>
		<StyledSelector
			placeholder={props.intl.formatMessage({
				id: `listEditor.sorter.groupsSelector.placeholder`
			})}
			onChange={props.onChange}
		>
			{props.items && props.items.map((groupName, index) =>
				<Option key={index} value={groupName}>{groupName}</Option>
			)}
		</StyledSelector>
		{props.divider && <StyledDivider/>}
	</Picker>

export default connect(GroupSelector)