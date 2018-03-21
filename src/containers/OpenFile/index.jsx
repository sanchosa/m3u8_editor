import React from 'react'
import {injectIntl} from 'react-intl'
import {Upload, Button, Icon} from 'antd'
import connect from './connect'

const OpenFile = ({customRequest, ...props}) =>
	<Upload
		accept=".m3u, .m3u8"
		showUploadList={false}
		customRequest={customRequest}
		{...props}
	>
		<Button>
			<Icon type="upload" /> {props.intl.formatMessage({id: `listUpload`})}
		</Button>
	</Upload>

export default injectIntl(connect(OpenFile))