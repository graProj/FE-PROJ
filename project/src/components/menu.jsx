import React from 'react';
import styles, { css } from 'styled-components';

export default function Menu({ isclose }) {
  
  return (
    <Container isclose={!isclose}>
        <H1>메 뉴</H1>
      
      <Category>
        <h3>awef</h3>
        <h3>awef</h3>
        <h3>awef</h3>
        <h3>awef</h3>
      </Category>
    </Container>
  );
}

const Container = styles.div`
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
`;
const Category = styles.div`
  width:100%;
  height:80vh;
  display: flex;
  flex-direction:column;
`
const H1 = styles.h1`
padding:20px;
`