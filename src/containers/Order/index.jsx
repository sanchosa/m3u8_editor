import React from 'react'
import styled from 'styled-components'
import {Row, Col, Divider, Input} from 'antd'
import GroupSelector from 'containers/ListEditor/content/GroupSelector'
import Label from 'components/Picker/Label'
import SortableList from 'components/SortableList'
import connect from './connect'

const StyledSearch = styled(Input.Search)`
	margin-bottom: 5px;
`
const StyledDivider = styled(Divider)`
	height: 746px;
`

const ChannelSorterItem = ({item, number}) =>
	<span>{number + 1}. <b>{item.name}</b></span>

const GroupSorterItem = ({item, number}) =>
	<span>{number + 1}. <b>{item}</b></span>

const Order = props => {
	return <Row key="2" type="flex" justify="center">
		<Col span={10}>
			<GroupSelector onChange={props.groupChange} intl={props.intl}/>
			<StyledSearch/>
			<Label>Channels Sorter</Label>
			<SortableList height={600} items={props.items && props.items.toArray() || []}>
				<ChannelSorterItem/>
			</SortableList>
		</Col>
		<StyledDivider type="vertical"/>
		<Col span={10}>
			<Label>Groups Sorter</Label>
			<SortableList height={723} items={props.groups && props.groups.toArray() || []}>
				<GroupSorterItem/>
			</SortableList>
		</Col>
	</Row>
}
export default connect(Order)