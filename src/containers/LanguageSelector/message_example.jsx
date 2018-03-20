import React from 'react'
import {injectIntl, FormattedMessage} from 'react-intl'
import {DatePicker} from 'antd'

const Component = props =>
	<span>{props.intl.formatMessage({id: `test`})}</span>
const Span = injectIntl(Component)

export default () => [
	<DatePicker key="2"/>,
	<span key="3"><FormattedMessage id="test"/></span>,
	<Span key="4"/>
]