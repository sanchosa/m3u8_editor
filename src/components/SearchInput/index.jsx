import React from 'react'
import styled from 'styled-components'
import {Icon, Input} from 'antd'

const Search = Input.Search
const StyledIcon = styled(Icon)`
	cursor: pointer;
	color: #ccc;
	transition: color 0.3s;
	font-size: 12px;

	:hover {
		color: #999;
	}
	:active {
		color: #666;
	}
`
const StyledDiv = styled.div`
	> input {
		padding-right: 56px !important;
	}
`

export default class SearchInput extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			value: props.defaultValue || null
		}

		this.onChange = this.onChange.bind(this)
		this.emitEmpty = this.emitEmpty.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
	onChange(e) {
		const value = e.target.value
		this.setState({value})
		this.props.onChange && this.props.onChange(value)
	}
	emitEmpty() {
		this.channelInput.focus()
		this.setState({value: null})
		this.props.onClear && this.props.onClear()
	}
	onSearch(value) {
		if (this.props.clearOnSearch) {
			this.emitEmpty()
		}
		value && this.props.onSearch && this.props.onSearch(value)
	}
	render() {
		const prefix = this.state.value
			? <StyledIcon key="clear" type="close-circle" onClick={this.emitEmpty}/>
			: null

		return <StyledDiv>
			<Search
				enterButton={this.props.enterButton || true}
				onSearch={this.onSearch}
				onChange={this.onChange}
				value={this.state.value}
				prefix={prefix}
				placeholder={this.props.placeholder}
				ref={node => this.channelInput = node}
			/>
		</StyledDiv>
	}
}
