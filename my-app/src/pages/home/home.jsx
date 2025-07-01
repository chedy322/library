import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  const handle_btn=()=>{
    navigate('/create_library')
  }
  return (
    <div>
      <h1>
        Welcome to the Library
      </h1>
      <button onClick={handle_btn}>Add Library now</button>
        </div>
  )
}

export default Home
