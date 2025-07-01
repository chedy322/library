import React, { useEffect, useState } from 'react'
import { useLibrary } from '../../hooks/Libraries'
import './library.css'
import { delete_library, update_library } from '../../utils/dboperation'
import { useNavigate } from 'react-router-dom'
function Library() {
  const {library,error,loading,id}=useLibrary()
  const navigate=useNavigate()
    const [local_error,setLocalError]=useState(null)
    const [Update_status,setUpdateStatus]=useState(false)
    const [update_form,setUpdateForm]=useState({
      address:"",
      city:"",
      phone:"",
      computers:'',
      wifi:"n",
      webpage:""
    })
    useEffect(()=>{
      if(library){
        setUpdateForm({
          address:library.location,
          city:library.city,
          phone:library.phone,
          computers:library.computers,
          wifi:library.wifi,
          webpage:library.webpage
        })
      }
    },[library])
    // handle input changes
    const handle_change=(e)=>{
      setUpdateForm(
        {
          ...update_form,
          [e.target.name]:e.target.value
        }
      )
    }
    const handle_delete=async()=>{
      try{
        await delete_library(id,setLocalError)
    }catch(err){
      console.log(err)
    }finally{
      if(local_error){
        // take out the error msg
        setTimeout(()=>{
            setLocalError(null)
        },[3000])
      }else{
        // on success user gets redirected
        alert("Library delete successfully")
        navigate('/libraries')
      }
    }
  }
  const handle_update=async ()=>{
   setUpdateStatus(true)
  }

  // submit form
  const handle_submit=async()=>{
    try{
      console.log(update_form)
      await update_library(id,update_form,setLocalError)
    }catch(err){
      console.log(err)
    }finally{
      if(local_error){
        setTimeout(()=>{
          setLocalError(null)
      },[3000])
      }else{
    alert("Library updated successfully")
    setUpdateStatus(false)
  }

    }
  }
  if(error) return <p style={{color:"red","font-size": "15px","font-weight": "bold"}}>{error}</p>
  if(loading) return <p style={{"font-size": "15px","font-weight": "bold"}}>Loading...</p>
  return (
    <div className="library_card">
    <h2 className="library_name">{library.name}</h2>
    <div className="library_info">
      {
        !Update_status?(
          <>
          <p><strong>Location: </strong> {library.location}</p>
          <p><strong>City: </strong> {library.city}</p>
          <p><strong>Phone: </strong> {library.phone}</p>
          <p><strong>Computers: </strong> {library.computers}</p>
          <p><strong>Wi-Fi: </strong> {library.wifi === "y" ? "Available" : "Not Available"}</p>
          <a
      href={library.webpage}
      target="_blank"
      rel="noopener noreferrer"
      className="library_link"
    >
      🌐 Visit Official Webpage
    </a>
          </>
        ):(
          <>
          <p><strong>Location:</strong> <input value={update_form.address} type='text' name="address" onChange={handle_change}/></p>
          <p><strong>City:</strong><input value= {update_form.city} type='text' name="city" onChange={handle_change}/></p>
          <p><strong>Phone:</strong> <input value={update_form.phone} type='text' name="phone" onChange={handle_change}/></p>
          <p><strong>Computers:</strong><input value={update_form.computers} type='text' name="computers" onChange={handle_change}/></p>
          <p><strong>Wi-Fi:</strong><input value= {update_form.wifi === "y" ? "Available" : "Not Available"} type='text' name='wifi' onChange={handle_change}/></p>
          <p><strong>Webpage:</strong><input value={update_form.webpage} type='text' name="webpage" onChange={handle_change}/></p>
          </>
        )
      }
     
    </div>
   
    {
      Update_status?
      (<>
      <button className='update_btn btn' onClick={handle_submit} type='submit' >Update</button>
      <button className='update_btn btn' style={{"font-size": "15px","font-weight": "bold"}} onClick={()=>setUpdateStatus(false)} >Cancel</button>
      </>)
      :
      <button className='update_btn btn' onClick={handle_update} >Update Library</button>
    }
    <button className="delete_btn btn" style={{"font-size": "15px","font-weight": "bold"}} onClick={handle_delete}>Delete Library</button>
    {
      local_error && <p style={{"color":"red","font-size": "15px","font-weight": "bold"}}>{local_error}</p>
    }
  </div>
  )
}

export default Library
