import React, { useEffect, useState } from 'react'
import styles, { keyframes, styled } from 'styled-components'
import Login from '../components/login/login';
import JoinBox from '../components/login/signup';
export default function Splash() {
  const [showSplashscreen, setShowSplashscreen] = useState(false);
  const [loginShow, setLoginShow] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    setTimeout(() => {
      setShowSplashscreen(true);
    }, 3000);
  }, [token]);

  const changeShow = () =>{
    setLoginShow(!loginShow)
  }
  return (
    <Container>

        
        <MainText>
          {!showSplashscreen ? <RotatingImage src="/logo_origin.png" alt="" width={500}/> :
          !loginShow ? <JoinBox/> : <Login/>
          }
          <Btn onClick={changeShow}>{ !loginShow ?"로그인 하러가기":"회원가입 하러가기"}</Btn>
        </MainText>
        
    </Container>
  )
}
const Btn = styled.button`
  width: 200px;
  background-color: transparent;
  height: 30px;
  position: fixed;
  bottom: 20px;
`
const fadeIn = keyframes`
  from {
    opacity: 0;
    background-size: 10% 10%;
  }
  to {
    opacity: 1;
    background-size: 60% 90%;
  }
`;
const changeBackground = keyframes`
  from {
    background-color: #000000;
  }
  to {
    background-color: #2C363F;
  }
`
const moveBackground = keyframes`
  from {
    background-position: center;
  }
  to {
    background-position: center right;
  }
`;
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
const Container = styles.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-size: 10% 10%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #000000;
  animation: ${changeBackground} 1s ease-in-out forwards, ${moveBackground} 1s ease-in-out 1s forwards;
`;

const MainText = styles.div`
  width:100%;
  height:100%;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  z-index: 100;
  animation: ${fadeIn} 0s ease-in-out 1.8s forwards;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  opacity:0;
  p{
    font-size:24px;
  }
`;


