import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
	* {
		background-repeat: no-repeat;
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}
	::selection {
		background: #3679d4;
		color: #fff;
	}
	html, body, #root {
		height: 100%;
	}
	img {
		border:0px;
	}
	a {
		color: #252525;
		text-decoration: underline;

		&:hover {
			text-decoration: underline;
		}
	}
	button, select {
		user-select: none;
		outline: 0;
	}
	input {
		outline: 0;
	}
`