import React from 'react'
import {Tabs, Table} from 'antd'

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

export default ({key, title, columns, dataSource, selectedKeys, onChange, onDeselect}) => {
	return dataSource.length > 0
		? <TabPane tab={title} key={key}>
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
		: null
}