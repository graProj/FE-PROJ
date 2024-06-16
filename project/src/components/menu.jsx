import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function Menu({ isclose }) {
  const close = isclose === 'false' || isclose === false;
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('rtk');
    navigate('/auth');
  }
  return (
    <Container isclose={close}>
        <H1>메 뉴</H1>
      
      <Category>
        <h3 onClick={logout}>로그아웃</h3>
        <h3 onClick={()=>navigate('/home/info')}>회원정보 수정</h3>
        <h3 onClick={()=>navigate('/home/testroom')}>카메라 테스트</h3>
        <h3>awef</h3>
      </Category>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left:0;
  height: 100%;
  width: 35%;
  background-color: #040d12d8;
  display:flex;
  flex-direction:column;
  align-items:space-between;
  padding:20px;
  color:white;
  text-align:center;
  z-index: 99;
  ${props =>
    props.isclose && // 수정된 부분
    css`
      display: none;
    `}
    h3{
      cursor: pointer;
    }
`;
const Category = styled.div`
  width:100%;
  height:80vh;
  display: flex;
  flex-direction:column;
`
const H1 = styled.h1`
padding:20px;
`