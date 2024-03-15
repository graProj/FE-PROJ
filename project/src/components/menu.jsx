import React from 'react';
import styled, { css } from 'styled-components';

export default function Menu({ isClose }) {
  return (
    <Container isclose={isClose}>
      {/* 내용 */}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 25%;
  background-color: blue;
  z-index: 99;
  /* isClose가 true이면 display: none을 적용 */
  ${props =>
    props.isClose &&
    css`
      display: none;
    `}
`;