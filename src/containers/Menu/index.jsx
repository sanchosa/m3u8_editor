import React from 'react'
import {Menu, Icon} from 'antd'

export default () =>
	<Menu
		defaultSelectedKeys={[`1`]}
		mode="inline"
		theme="light"
	>
		<Menu.Item key="1">
			<Icon type="mail"/>
			<span>Moving & Editing</span>
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="calendar" />
			<span>Ordering</span>
		</Menu.Item>
		<Menu.Item key="3">
			<Icon type="setting" />
			<span>Export</span>
		</Menu.Item>
	</Menu>