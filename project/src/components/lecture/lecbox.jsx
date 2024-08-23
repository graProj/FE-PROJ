import { EnterIcon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '../ui/alert';

function Lecbox({ onDelete , text, boxId, name}) {
  const location = useLocation();
  const navigate = useNavigate();

  const openNewWindow = (relativeUrl) => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${relativeUrl}`;
    if (window.electron) {
      window.electron.openNewWindow(fullUrl);
    } else {
      console.error('Electron API not available');
    }
  };

  return (
    <div className="w-[95%] h-12 border border-black m-1 rounded-lg flex items-center justify-between bg-white/60">
      <div className="bg-transparent border-none w-[90%] flex justify-center">
        <div className="min-w-full h-full text-black flex items-center justify-around">
          <h2>{text}</h2>
          <p>- {name}</p>
          {location.pathname === `/home/remoteinfo` ? (
            <Alert
              showicon={<EnterIcon />}
              title={`${text} 원격실에 참여하시겠습니까?`}
              context={'교수님의 원격제어를 허용하게됩니다.'}
              enter={() => { openNewWindow(`/#/home/room/${boxId}`); }}
            />
          ) : (
            <Alert
              showicon={<EnterIcon />}
              title={`${text} 강의실에 참여하시겠습니까?`}
              context={"학생의 접속여부를 알게됩니다."}
              enter={()=>{navigate(`/home/${boxId}`)}}
            />
          )}
        </div>
      </div>
      <Alert
        showicon={<TrashIcon />}
        title={`${text} 강의를 삭제하시겠습니까?`}
        context={"해당 강의시청을 못하게됩니다."}
        enter={() => { onDelete(); }}
      />
    </div>
  );
}

export default Lecbox;