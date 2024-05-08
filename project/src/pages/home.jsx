import React from 'react';
import styled from 'styled-components';
import Lecture from '../components/lecture/lecture';

export default function Home() {
  console.log("메인 렌더링")

  return (
    <Container>
      <Category>
        <Title>강의 신청내역</Title>
      </Category>
      <Lecture/>

      <MyInfo><Title>학생</Title><a href="./room">방입장</a></MyInfo>
    </Container>
  );
}

const Container = styled.div`
  width:100vw;
  z-index:100;
  height: calc(100vh - 55px);
  display:flex;
`;

const Category = styled.div`
  width: 20%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  border-right: 1px solid #c4ae9bbb;
`;


const Title = styled.div`
  width: 100%;
  min-height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  border-bottom:1px solid #c4ae9bbb;
`;



const MyInfo = styled.div`
  display:flex;
  flex-direction:column;
  width: 25%;
  height:100%;
  border-left:1px solid #c4ae9bbb;
`;

