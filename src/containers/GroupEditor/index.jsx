import React from 'react'
import {Input, Button, Popconfirm, notification} from 'antd'
import connect from './connect'

class GroupEditor extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			editGroupValue: null
		}
		this.formatMessage = this.formatMessage.bind(this)
		this.deleteGroup = this.deleteGroup.bind(this)
		this.editGroup = this.editGroup.bind(this)
		this.editGroupChange = this.editGroupChange.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		this.setState({editGroupValue: nextProps.group})
	}
	deleteGroup() {
		this.props.deleteGroup(this.props.group)
	}
	editGroup() {
		if (this.props.groups.includes(this.state.editGroupValue)) {
			return notification[`warning`]({
				message: `Group ${this.state.editGroupValue} allready exists !`
			})
		}

		this.props.editGroup({
			current: this.props.group,
			newOne: this.state.editGroupValue
		})
	}
	editGroupChange(e) {
		this.setState({
			editGroupValue: e.target.value
		})
	}
	formatMessage(id) {
		this.props.intl && this.props.intl.formatMessage({id})
	}
	render() {
		return <Input.Group compact style={{display: `flex`}}>
			<Popconfirm
				title={this.props.intl.formatMessage({
					id: `edit.group.delete.confirm.title`
				}, {
					group: this.props.group
				})}
				onConfirm={this.deleteGroup}
				okType="danger"
				okText={this.formatMessage(`yes`)}
				cancelText={this.formatMessage(`no`)}
			>
				<Button
					icon="delete"
					type="danger"
					style={{padding: `0 15px`}}
					disabled={!(this.props.group && this.props.group !== `none`)}
				/>
			</Popconfirm>
			<Input
				value={this.state.editGroupValue}
				onChange={this.editGroupChange}
				onPressEnter={this.editGroup}
				disabled={!(this.props.group && this.props.group !== `none`)}
			/>
			<Button
				icon="edit"
				type="primary"
				style={{padding: `0 15px`}}
				disabled={!(this.props.group && this.props.group !== `none`)}
				onClick={this.editGroup}
			/>
		</Input.Group>
	}
}

export default connect(GroupEditor)