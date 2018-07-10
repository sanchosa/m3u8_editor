import React from 'react'
import {Upload, Button, Icon} from 'antd'
import styled from 'styled-components'

const Dragger = Upload.Dragger

const StyledDragger = styled(Dragger)`
	> .ant-upload-drag {
		height: calc(100vh - 350px) !important;
		min-height: 150px;
	}
`

export const OpenFile = props =>
	<Upload
		{...props}
		accept=".m3u, .m3u8"
		showUploadList={false}
	>
		<Button>
			<Icon type="upload" /> {props.intl.formatMessage({id: `listUpload`})}
		</Button>
	</Upload>

export const DragFile = props =>
	<StyledDragger
		{...props}
		accept=".m3u, .m3u8"
		showUploadList={true}
	>
		<p className="ant-upload-drag-icon"><Icon type="inbox"/></p>
		<p className="ant-upload-text">{props.intl.formatMessage({id: `import.dragInstructions`})}</p>
	</StyledDragger>