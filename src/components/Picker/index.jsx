import React from 'react'
import Wrapper from './Wrapper'
import Label from './Label'

const Picker = ({title, children}) =>
	<Wrapper>
		<Label>{title}</Label>
		{children}
	</Wrapper>

export default Picker
