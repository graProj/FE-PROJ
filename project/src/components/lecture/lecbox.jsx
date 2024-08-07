import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

function Lecbox({ onDelete , text, boxId, name}) {
  const handleDelete = () => {
    onDelete();
  };
  const goLecRoom = async()=> {
    const isJoin = window.confirm(`${text} 강의실에 참여하시겠습니까?`);
    if(isJoin){
      window.location.href = `/home/${boxId}`
    }
  }
  const goRemoteRoom = async()=> {
    const isJoin = window.confirm(`${text} 원격실에 참여하시겠습니까?`);
    if(isJoin){
      window.location.href = `/home/room/${boxId}`
    }
  }
  
  return (
    <div className="w-[95%] h-12 border border-black m-1 rounded-lg flex items-center justify-between bg-white/60">
      <button className="bg-transparent border-none w-[90%] flex justify-center">
        <div className="min-w-full h-full text-black flex items-center justify-around">
          <h2>{text}</h2>
          <p>- {name}</p>
          <button onClick={goLecRoom} className="border border-white rounded-lg shadow-md">강의실</button>
          <button onClick={goRemoteRoom} className="border border-white rounded-lg shadow-md">원격실</button>
        </div>
      </button>
      <button onClick={handleDelete} className="bg-transparent border-none">
        <TrashIcon />
      </button>
    </div>
  );
}

export default Lecbox;