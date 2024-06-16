import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notfound() {
  const navigate = useNavigate()
  return (
    <div>
      Didacto에는 존재하지 않는 페이지입니다..!
      <button onClick={()=>navigate(-1)}>돌아가기</button>
    </div>
  )
}
