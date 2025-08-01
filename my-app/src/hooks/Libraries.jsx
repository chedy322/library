import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom';

const url="https://library-3-1tsv.onrender.com/libraries"
export const useLibraries=()=>{
    const [libraries,setLibraries]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const handlefetch=async()=>{
            try{
                const response=await fetch(url,{
                    method:"GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                      }
                })
                if(!response.ok){
                    setError(`HTTP error! status: ${response.status}`)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result=await response.json()
                setLibraries(result)
            }catch(err){
                console.log(err)
                setError(err.message)
            }finally
            {
                setLoading(false)
            }
        }
        handlefetch()
    },[])
    return {libraries,error,loading}
}

export const useLibrary=()=>{
    const [library,setLibray]=useState()
    const [loading,setLoading]=useState(true)
    // id:library_id
    const {id}=useParams()
    const [error,setError]=useState(null)
    console.log(`url/${id}`)
    useEffect(()=>{
        const handlefetch=async()=>{
            try{
                const response=await fetch(`${url}/${id}`,{
                    method:"GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                      }
                })
                if(!response.ok){
                    setError(response.message)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result=await response.json()
                console.log(result)
                setLibray(result)
            }catch(err){
                console.log(err)
                setError(err.message)
            }finally{
                setLoading(false)
            }
            
        }
        handlefetch()
    },[id])
    return {library,error,loading,id}
}
