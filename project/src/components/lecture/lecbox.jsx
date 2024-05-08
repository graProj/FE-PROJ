import React from 'react';
import styled from 'styled-components';


function Lecbox({ onDelete , text, boxId}) {
  const handleDelete = () => {
    onDelete();
  };
  const goRoom = ()=>{
    window.location.href = `/home/${boxId}`
  }
  return (
    <Container>
      <button onClick={goRoom}><LecText>{text}</LecText></button>
      <button onClick={handleDelete}>-</button>
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
`;


const LecText = styled.div`
  min-width: 100%; 
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Lecbox;
