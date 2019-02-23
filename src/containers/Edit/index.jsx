import React from 'react'
import {Row, Col, Icon, notification} from 'antd'
import styled from 'styled-components'
import SearchInput from 'components/SearchInput'
import ListName from 'containers/ListName'
import GroupEditor from 'containers/GroupEditor'
import {LeftGroupSelector, RightGroupSelector} from './content/GroupSelector'
import {LeftChannelForm, RightChannelForm} from './content/Channel'
import Transfer from './content/Transfer'
import connect from './connect'

const gutter = 10
const transferButtonsWidth = 23
const diff = transferButtonsWidth - gutter / 2

const StyledRow = styled(Row)`
	padding-bottom: 10px;
`
const LeftWrapper = styled.div`
	margin-right: ${diff}px;
	width: calc(100% - ${diff}px)
`
const RightWrapper = styled.div`
	margin-left: ${diff}px;
	width: calc(100% - ${diff}px)
`

class Edit extends React.Component {
	constructor(props) {
		super(props)

		this.addNewGroup = this.addNewGroup.bind(this)
		this.formatMessage = this.formatMessage.bind(this)
	}
	addNewGroup(value) {
		notification.info({
			message: this.props.intl.formatMessage({id: `edit.group.add.message`}, {value})
		})
		this.props.setValue(`leftGroup`, value)
		this.props.createGroup(value)
	}
	formatMessage(id) {
		return this.props.intl.formatMessage({id})
	}
	render() {
		return [
			<StyledRow key="name" type="flex" gutter={gutter} justify="center">
				<Col span={12}>
					<ListName intl={this.props.intl}/>
				</Col>
			</StyledRow>,
			<Row key="selectors" gutter={gutter}>
				<Col span={6}>
					<SearchInput
						clearOnSearch
						placeholder={this.formatMessage(`edit.group.add.placeholder`)}
						onSearch={this.addNewGroup}
						enterButton={<Icon type="plus"/>}
					/>
				</Col>
				<Col span={6}>
					<LeftWrapper>
						<LeftGroupSelector intl={this.props.intl}/>
					</LeftWrapper>
				</Col>
				<Col span={6}>
					<RightWrapper>
						<RightGroupSelector intl={this.props.intl}/>
					</RightWrapper>
				</Col>
				<Col span={6}>
					<GroupEditor intl={this.props.intl}/>
				</Col>
			</Row>,
			<Row key="edit" gutter={gutter}>
				<Col span={6}>
					<LeftChannelForm intl={this.props.intl}/>
				</Col>
				<Col span={12}>
					<Transfer
						listStyle={{
							width: `calc(50% - ${transferButtonsWidth}px)`,
							height: `${window.innerHeight - 251}px`}}
						intl={this.props.intl}
					/>
				</Col>
				<Col span={6}>
					<RightChannelForm intl={this.props.intl}/>
				</Col>
			</Row>
		]
	}
}

export default connect(Edit)