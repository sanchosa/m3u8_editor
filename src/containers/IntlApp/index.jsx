import React from 'react'
import connect from './connect'
import App from 'containers/App'

import {LocaleProvider} from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
import enUS from 'antd/lib/locale-provider/en_US'

import {addLocaleData, IntlProvider} from 'react-intl'
import appLocaleDataEn from 'react-intl/locale-data/en'
import appLocaleDataRu from 'react-intl/locale-data/ru'
import messagesEn from '../../../locales/en'
import messagesRu from '../../../locales/ru'

const LocalizedApp = props => {
	const settings = {
		locale: enUS,
		intl: `en`,
		messages: messagesEn,
		data: appLocaleDataEn
	}
	switch (props.localeString) {
	case `ruRU`:
		settings.locale = ruRU
		settings.intl = `ru`
		settings.messages = messagesRu
		settings.data = appLocaleDataRu
		break
	}

	addLocaleData(settings.data)
	return <LocaleProvider locale={settings.locale}>
		<IntlProvider
			locale={settings.intl}
			messages={settings.messages}
		>
			<App/>
		</IntlProvider>
	</LocaleProvider>
}

export default connect(LocalizedApp)