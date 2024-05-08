import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router-dom';

import Menu from './menu'
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Switch } from '@mui/material';

export default function Header() {
  const [isClickMenu, setIsClickMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const Navigate = useNavigate();
  
  const goHome = () => {
    Navigate('/');
  };

  const MenuHandler = () => {
    setIsClickMenu(!isClickMenu);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <GlobalStyle darkMode={isDarkMode} />
      <Container>
        <Logo onClick={goHome}><img src="/logo.png" alt="awef" width={60} /></Logo>

        <Cates>
          <Btn onClick={MenuHandler}><MenuIcon/></Btn>
          <Switch defaultChecked onChange={toggleDarkMode}/>
        </Cates> 
        <Menu isclose={isClickMenu ? true : false} />
      </Container>
    </>
  );
}
const Container = styled.div`
  height: 50px;
  display:flex;
  justify-content: space-between;
  padding-left:15px;
  padding-right:15px;
  align-items: center;
  border-bottom: 1.5px solid #1E1F22;
  z-index:10;
`
const Logo= styled.div`
  width: 20%;
  
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🏠</text></svg>") 16 0, auto;
`
const Cates = styled.div`
  width: 40%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const Btn = styled(Button)`
  background-color: transparent;
  border: none;
`


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.darkMode ? '#40444B' : '#ffffff')}; // 다크 모드일 때 배경색 변경
    color: ${props => (props.darkMode ? '#ffffff' : 'black')}; // 다크 모드일 때 폰트 색상 변경
  }
`;