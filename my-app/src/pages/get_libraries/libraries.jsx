import React from 'react'
import { useLibraries } from '../../hooks/Libraries'
import { useNavigate } from 'react-router-dom'
import "./libraries.css"
import Single_library_container from '../../components/single_library_container/single_library_container'
function Libraries() {
  const {libraries,error,loading}=useLibraries()
  const navigate=useNavigate()
  const handle_navigate=(path)=>{
    navigate(path)
  }
  console.log(libraries)
  if(error) return <p style={{color:"red","font-size": "15px","font-weight": "bold"}}>Opps Error,please try again</p>
  if(loading) return <p style={{"font-size": "15px","font-weight": "bold"}}>Loading...</p>
  return (
    <div className='libraries_main_div'>
      <h1>All libraries</h1>
        <Single_library_container libraries={libraries} handle_navigate={handle_navigate} not_found_msg="No Library found"/>
    </div>
  )
}

export default Libraries
