import React from 'react'
import styled from 'styled-components'
import {Popconfirm, Button, Icon} from 'antd'

const StyledButton = styled(Button)`
	margin-top: -4px;
`

export default ({intl, onConfirm, count}) =>
	<Popconfirm
		title={intl.formatMessage({id: `edit.channel.delete.confirm.title`}, {count})}
		onConfirm={onConfirm}
		okType="danger"
		okText={intl.formatMessage({id: `yes`})}
		cancelText={intl.formatMessage({id: `no`})}
	>
		<StyledButton type="danger" size="small" shape="circle"
			disabled={count === 0}
		>
			<Icon type="delete"/>
		</StyledButton>
	</Popconfirm>