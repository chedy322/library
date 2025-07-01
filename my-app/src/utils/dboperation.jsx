// import { useState } from "react"
const url="http://localhost:3500/libraries"
// function to post request
export const create_library=async(form,setError)=>{
try{
    console.log(form)
    if(!form){
        setError("Please fill the Form")
        return false;
    }
    const response=await fetch(url,{
        method:"POST",
        credentials:"include",
        headers:{
           "content-type":"application/json"
        },
        body:JSON.stringify(form)
    })
    if(!response.ok){
        setError('Opps Error hapened')
        return false
    }
 
    // success
    return true
}catch(err){
    console.log(err)
    setError(err)
    return false
}
}


// function to put req (based on id)
export const update_library=async(id,updated_object,setError)=>{
    try{
        const response=await fetch(`${url}/${id}`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({form:updated_object})
        })
        if(!response.ok){
            console.log(response)
            setError('Opps Error hapened')
            return false
        }
        // success
        return true
    }catch(err){
        console.log(err)
        setError(err)
        return false
    }
}


// function to delete based (on id)
export const delete_library=async(id,setError)=>{
    try{
        const response=await fetch(`${url}/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            }
        })
        if(!response.ok){
            setError('Opps Error hapened')
            return false
        }
        // success
        return true
    }catch(err){
        console.log(err)
        setError(err)
        return false
    }
}

export const search_by_city=async (city,setError,setLibraries,setLoading)=>{
    try{
        // const [libraries,setLibraries]=useState([])
        // const [loading,setLoading]=useState(true)
        if(!city){
            setError("Field is required")
            return false
        }
        setLoading(true)
        console.log(city)
        const response=await fetch(`${url}/searched_libraries?city=${encodeURIComponent(city)}`,{
            method:'GET',
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
           
        })
        if(!response.ok){
            console.log(response)
            setError('Opps Error hapened')
            return false
        }
        const result=await response.json()
        console.log("resulltt",result)
        setLibraries(result)
    }catch(err){
        console.log(err)
        setError(err)
    }finally{
        setLoading(false)
    }
}