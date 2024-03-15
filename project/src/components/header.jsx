import React, { useState } from 'react'
import styles from 'styled-components'
import Menu from './menu'

export default function Header() {
  const [isClickMenu, setIsClickMenu] = useState(false)
  const MenuHandler  = ()=>{
    setIsClickMenu(!isClickMenu)    
  }
  return (
    <Container>
      <Logo/>
      <button onClick={MenuHandler}>awef</button>
      <Menu isclose ={isClickMenu}/>
      <Icons/>
    </Container>
  )
}
const Container = styles.div`
  width: 100%;
  height: 50px;
  background-color: black;
  display:flex;
  justify-content: space-between;
  padding-left:15px;
  padding-right:15px;
  align-items: center;
`
const Logo= styles.div`
  width: 20%;
  height:100%
  color: yellow;
`
const Icons = styles.div`
  width: 40%;
  height:100%;
  background-color: blue;
`
