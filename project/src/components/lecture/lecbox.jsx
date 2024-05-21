import { Delete } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';


function Lecbox({ onDelete , text, boxId, name}) {
  const handleDelete = () => {
    onDelete();
  };
  const goRoom = async()=>{
    const isJoin= window.confirm(`${text} 참여하시겠습니까?`);
    if(isJoin){
      window.location.href = `/home/${boxId}`
    }
    
  }
  
  return (
    <Container >
      <Btn onClick={goRoom}><LecText><h2>{text}</h2><p>강의자 :{name}</p></LecText></Btn>
      <button onClick={handleDelete}><Delete/></button>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  height: 50px;
  border: 1px solid black;
  margin: 2px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff9a;
  button{
    background-color: transparent;
    border: none;
  }
`;
const Btn = styled.button`
  background-color: transparent;
    border: none;
    width: 70%;
    display: flex;
    justify-content: center;
`

const LecText = styled.div`
  min-width: 100%; 
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Lecbox;
