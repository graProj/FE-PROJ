import React from 'react'

import { SearchModal } from '../components/home/searchLecture'
import { ExitIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
export default function Search() {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      <div className='absolute top-[60px] left-5 flex items-center justify-center cursor-pointer' onClick={()=>navigate(-1)}>
        <ExitIcon width={50} height={50} /><span className='text-[32px]'>돌아가기</span>
      </div>
      <SearchModal/>
    </div>
    
  )
}
