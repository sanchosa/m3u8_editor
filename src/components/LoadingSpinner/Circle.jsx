import React from 'react'
import styled, {keyframes, css} from 'styled-components'

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`

export default (props) => {
	const CirclePrimitive = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props.rotate && css`
      transform: rotate(${props.rotate}deg);
    `}

    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #76b8f9;
      border-radius: 100%;
      animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
      ${props.delay && css`
        animation-delay: ${props.delay}s;
      `}
    }
  `
	return <CirclePrimitive />
}
