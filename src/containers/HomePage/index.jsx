import React from 'react'
import {connect} from 'react-redux'
import {Upload, Icon, message, DatePicker, Select} from 'antd'
import {setLocale} from 'store/global/actions'
import {injectIntl, FormattedMessage} from 'react-intl'

const Option = Select.Option
const Dragger = Upload.Dragger


const mapActions = dispatch => ({
	onChange: value => dispatch(setLocale(value))
})

const MySelect = props =>
	<Select defaultValue="enUS" onChange={props.onChange}>
      <Option value="enUS">ENG</Option>
      <Option value="ruRU">RUS</Option>
    </Select>
const LocChanger = connect(null, mapActions)(MySelect)

const Component = props =>
	<span>{props.intl.formatMessage({id: "test"})}</span>
const Span = injectIntl(Component)

const HomePage = () => {
	/*<Dragger>
    	<p className="ant-upload-drag-icon">
     		<Icon type="inbox" />
    	</p>
    	<p className="ant-upload-text">Click or drag file to this area to upload</p>
    	<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  	</Dragger>*/
  	return [<LocChanger key="1"/>,
  	<DatePicker key="2"/>,
  	<span key="3"><FormattedMessage id="test"/></span>,
  	<Span key="4"/>]
}

export default HomePage
