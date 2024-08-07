import { ArchiveIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';
import React from 'react';

function M_Lecbox({ onEnroll, text, boxId, name }) {
  const handleSubmit = () => {
    onEnroll();
  };

  return (
    <div className="w-[95%] h-full border border-black m-0.5 rounded-lg flex items-center justify-between bg-[#ffffff9a]">
      <button className="bg-transparent border-none w-[70%] flex justify-center">
        <div className="min-w-full h-full text-black flex items-center justify-around">
          <h2>{text}</h2>
          <p>강의자 :{name}</p>
        </div>
      </button>
      <Button onClick={handleSubmit} className="bg-transparent border-none">
        <ArchiveIcon />
      </Button>
    </div>
  );
}

export default M_Lecbox;