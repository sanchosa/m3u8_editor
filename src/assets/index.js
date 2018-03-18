import {injectGlobal} from 'styled-components'
import '!file-loader?name=[name].[ext]!assets/images/favicon.ico'
import '!file-loader?name=[name].[ext]!assets/images/icon-128x128.png'
import '!file-loader?name=[name].[ext]!manifest.json'

injectGlobal`
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
