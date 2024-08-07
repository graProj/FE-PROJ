import React from 'react';
import RequestBox from '../components/lecture/requestBox';
import { UserData } from '../api/user';
import { BentoCard, BentoGrid } from '../components/ui/bentoGrid';
import { TrashIcon } from 'lucide-react';
import { CursorArrowIcon, EnterIcon, MagnifyingGlassIcon, PersonIcon } from '@radix-ui/react-icons';


export default function Home() {
  const { data } = UserData();

  return (
    <div className="w-screen z-100 flex">
      <div className="w-1/5 h-full flex flex-col items-center border-r border-[#ececec]">
        <div className="w-full min-h-15 flex items-center justify-center text-2xl border-b border-[#ececec]">
          강의 신청내역
        </div>
        <RequestBox />
      </div>
      <div className="flex flex-col w-1/4 h-[calc(100vh-55px)] border-l [#ececec]">
        <div className="w-[80vw] overflow-hidden min-h-15 flex items-center justify-center text-2xl border-b border-[#ececec]">
          {`${data?.name}님 반갑습니다.`}
        </div>
        <div className="container mx-auto p-4 w-[70vw] overflow-y-auto  ">
          <BentoGrid >
            <BentoCard
              name="강의실"
              Icon={EnterIcon}
              description="강의를 들을래요"
              href="/home/lectureinfo"
              cta="ENTER"

              className='md:row-start-1 md:row-end-4 md:col-start-2 md:col-end-3'
            />
            <BentoCard
              name="정보 수정"
              Icon={PersonIcon}
              description="당신의 정보를 수정하세요."
              href="/home/info"
              cta="ENTER"
              className= "md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3"
            />
            <BentoCard
              name="테스트"
              Icon={TrashIcon}
              description="카메라 테스트"
              href="/home/testroom"
              cta="ENTER"
              className= "md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4"
            />
            <BentoCard
              name="원격실"
              Icon={CursorArrowIcon}
              description="교수님께 맡겨요"
              href="/home/remoteinfo"
              cta="ENTER"
              className= "md:col-start-3 md:col-end-3 md:row-start-1 md:row-end-2"
            />
            <BentoCard
              name="강의 찾기"
              Icon={MagnifyingGlassIcon}
              description=""
              href="/home/search"
              cta="ENTER"
              className= "md:col-start-3 md:col-end-3 md:row-start-2 md:row-end-4"
            />

          </BentoGrid>
        </div>
      </div>
    </div>
  );
}