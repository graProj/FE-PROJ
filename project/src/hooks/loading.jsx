import React from 'react'
import styled, { keyframes } from 'styled-components'
export default function LoadingIndicator() {
  return (
    <Container><div><RotatingImage src="/logo_origin.png" alt="" width={150}/></div></Container>
  )
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`
const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const RotatingImage = styled.img`

  animation: ${rotate} 3s linear infinite; /* 애니메이션 지속시간 및 반복 설정 */
`;
