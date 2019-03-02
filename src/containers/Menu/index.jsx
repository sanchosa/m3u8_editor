import React from 'react'
import styled from 'styled-components'
import {Menu, Icon, Popover} from 'antd'
import connect from './connect'
import Content from 'components/PopoverContent'

const StyledSpan = styled.span`
	display: block;
`

const Component = props => {
	const getMenuContent = (key, icon) => props.collapsed
		? <StyledSpan>
			<Icon type={icon}/>
			<span>{props.intl.formatMessage({id: key})}</span>
		</StyledSpan>
		: <Popover
			placement={props.mode && props.mode === `horizontal` ? `bottomLeft` : `rightTop`}
			title={props.intl.formatMessage({id: key})}
			content={
				<Content
					width="200px"
					data={props.intl.formatMessage({id: `${key}.popover.content`})}
				/>
			}
			mouseEnterDelay={1}
		>
			<StyledSpan>
				<Icon type={icon}/>
				<span>{props.intl.formatMessage({id: key})}</span>
			</StyledSpan>
		</Popover>

	return <Menu
		defaultSelectedKeys={[`import`]}
		mode={props.mode}
		theme="light"
		onSelect={props.setControl}
		selectedKeys={[props.control]}
	>
		<Menu.Item key="import">
			{getMenuContent(`control.import`, `upload`)}
		</Menu.Item>
		{props.compareVisible && <Menu.Item key="compare">
			{getMenuContent(`control.compare`, `file-search`)}
		</Menu.Item>}
		<Menu.Item key="edit">
			{getMenuContent(`control.edit`, `edit`)}
		</Menu.Item>
		<Menu.Item key="order">
			{getMenuContent(`control.order`, `bars`)}
		</Menu.Item>
		<Menu.Item key="export">
			{getMenuContent(`control.export`, `export`)}
		</Menu.Item>
	</Menu>
}

export default connect(Component)