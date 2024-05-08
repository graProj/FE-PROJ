import React from 'react';
import styles, { css } from 'styled-components';

export default function Modal({ isclose, onClose }) {
    const closeBtn = () => {
        onClose(); // 부모 컴포넌트에서 전달된 닫기 함수 호출
    };
    const goLogin = ()=>{window.location.href='/login'}
    const goHome = ()=>{window.location.href='/home'}
    return (
        <Container isclose={isclose}>
            
            <MainContainer>
                <button onClick={closeBtn}>
                    X
                </button>
                <MainContext>
                    <h2>DIDACTO 회원이신가요?</h2>
                    <Btn onClick={goLogin}><h3>로그인</h3></Btn>
                    <Btn onClick={goHome}><h3>홈페이지로 이동</h3></Btn>
                </MainContext>
            </MainContainer>
            <OpContainer/>
        </Container>
    );
}

const Container = styles.div`
  position: fixed;
  top: 0;
  left:0;
  height: 100vh;
  width: 100vw;
  display:flex;
  z-index:101;
  justify-content:center;
  align-items:center;
  ${props =>
    props.isclose === "true" && // 수정된 부분
    css`
      display: none;
    `}
`;
const OpContainer = styles.div`
  width:100vw;
  height:100vh;
  opacity:0.7;
  z-index:3;
  position:relative;
  background-color:black;
`

const MainContainer = styles.div`
  position:fixed;
  width:40%;
  height:60%;
  background-color:#fe9d00;
  z-index:104;
  border-radius:20px;
  color:black;
`
const MainContext = styles.div`
  position:fixed;
  width:40%;
  height:50%;
  background-color:#fe9d00;
  z-index:104;
  border-radius:20px;
  color:black;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-evenly;
  text-align:center;
`
const Btn = styles.button`
    font-family: 'BMJUA';
    width: 200px;
    height: 70px;
    z-index:108;
    background: linear-gradient(360deg, #077d8db4 0%, #06d5ff 70%);
    color: black;
    font-size: 24px;
    border: 1px solid black;
    border-radius: 25px;
    cursor: pointer;
    margin:10px;
    &:hover {
      background:none;
      color: yellow;
      background-color: black;
    }

`