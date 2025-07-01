import React, { useState } from 'react'
import { create_library } from '../../utils/dboperation'
import './create_library.css'
function Create_library() {
    const [form,setForm]=useState({
        name:"",
        city:"",
        webpage:"",
        phone:"",
        wifi:"",
        computers:"",
        location:"",
    })
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(null)
    const handle_form=async(e)=>{
        e.preventDefault()
        // console.log(form)
        try{
            await create_library(form,setError)
    setSuccess(true)

        }catch(err){
            console.log(err)
        }finally{
            setForm({
                name:"",
                city:"",
                webpage:"",
                phone:"",
                wifi:"",
                computers:"",
                address:""
            })
            setTimeout(()=>{
                setError(null)
               setSuccess(null)
            },5000)
        }
    }
    const handle_change=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div className='library_form'>
    <form method="POST" onSubmit={handle_form}>
        <label htmlFor="name">Name</label>
        <input id="name" value={form.name} onChange={handle_change} type='text' name="name" required placeholder='Enter library name...'/>
        <label htmlFor="city">City</label>
        <input id="city" value={form.city} onChange={handle_change} type="text" name="city" required placeholder='Enter library city...'/>
        <label htmlFor="webpage">Webpage</label>
        <input id="webpage" value={form.webpage} onChange={handle_change} type="text" name="webpage" required placeholder='Enter library webpage...'/>
        <label htmlFor="phone">Phone</label>
        <input id="phone" value={form.phone} onChange={handle_change} type="text" name="phone" required placeholder='Enter library phone...'/>
        <label htmlFor="wifi">Wifi</label>
        <input id="wifi" value={form.wifi} onChange={handle_change} type="text" name="wifi" required placeholder='Is Wi-Fi available y/n...'/>
        <label htmlFor="computers">Computers</label>
        <input id="computers" value={form.computers} onChange={handle_change} type="text" name="computers" required placeholder='How many computers in the library...'/>
        <label htmlFor="address">Location</label>
        <input id="address" value={form.address} onChange={handle_change} type="text" name="address" required placeholder='Enter library address...'/>
        <button type="submit" className='form_button'>
            Submit
        </button>
    </form>
    {
        error && <p style={{color:"red","font-size": "15px","font-weight": "bold"}}>{error}</p>
    }
    {
        success && <p style={{color:"green","font-size": "15px","font-weight": "bold"}}>Form submitted successfully</p>
    }
    </div>
  )
}

export default Create_library
