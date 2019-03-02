import React from 'react'
import {Tabs, Table, Row, Col} from 'antd'

const TabPane = Tabs.TabPane

const getCheckboxParams = (selectedKeys, record) => {
	if (!record.ids) {
		return {
			checked: selectedKeys.includes(record.id),
		}
	}

	const diff = record.ids.filter(id => !selectedKeys.includes(id))

	return {
		checked: diff.length === 0,
		indeterminate: diff.length > 0 && diff.length < record.ids.length,
	}
}

export default props => {
	if (props.dataSource.length === 0) return null

	const {key, columns, dataSource, selectedKeys, onChange, onDeselect} = props
	const title = props.formatMessage(`compare.tab.${key}.title`)

	return <TabPane tab={title} key={key}>
		<Row type="flex" justify="center">
			<h3>{title}</h3>
		</Row>
		<Row type="flex" justify="center" style={{marginBottom: `20px`}}>
			<Col>
				<em>{props.formatMessage(`compare.tab.${key}.description`)}</em>
			</Col>
		</Row>
		<Table
			pagination={false}
			columns={columns}
			dataSource={dataSource}
			rowKey="id"
			rowSelection={{
				onChange,
				onSelect: (record, selected) => {
					if (selected) return

					return record.ids
						? onDeselect([record.id, ...record.ids], selectedKeys)
						: onDeselect([record.id], selectedKeys)
				},
				getCheckboxProps: record => getCheckboxParams(selectedKeys, record),
				selectedRowKeys: selectedKeys,
			}}
		/>
	</TabPane>
}