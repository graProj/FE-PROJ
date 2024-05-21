import React from 'react';
import styled from 'styled-components';

import Lecture from '../components/lecture/lecture';

import RequestBox from '../components/lecture/requestBox';
import {UserData} from '../api/user';
export default function Home() {
  const { data, isLoading, error } = UserData();

  return (
    <Container>
      <Category>
        <Title>강의 신청내역</Title>
        <RequestBox/>
      </Category>
      <Lecture/>

      <MyInfo>
        <Title>
          {`${data?.name}님 반갑습니다.`}
        </Title>
        <a href="./room">방입장</a>
      </MyInfo>
    </Container>
  );
}

const Container = styled.div`
  width:100vw;
  z-index:100;
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
  font-size:24px;
  border-bottom:1px solid #c4ae9bbb;
`;



const MyInfo = styled.div`
  display:flex;
  flex-direction:column;
  width: 25%;
  height:calc(100vh - 55px);
  border-left:1px solid #c4ae9bbb;
`;

