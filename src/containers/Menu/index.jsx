import React from 'react'
import styled from 'styled-components'
import {Menu, Icon, Popover} from 'antd'
import connect from './connect'

const StyledSpan = styled.span`
	display: block;
`

const Content = ({id, intl}) =>
	<div style={{width: `200px`}}>
		<p>{intl.formatMessage({id})}</p>
	</div>

const Component = props => {
	const getMenuContent = (key, icon) => props.collapsed
		? <StyledSpan>
			<Icon type={icon}/>
			<span>{props.intl.formatMessage({id: key})}</span>
		</StyledSpan>
		: <Popover
			placement="rightTop"
			title={props.intl.formatMessage({id: key})}
			content={
				<Content
					intl={props.intl}
					id={`${key}.popover.content`}
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
		defaultSelectedKeys={[`edit`]}
		mode="inline"
		theme="light"
		onSelect={props.setControl}
	>
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