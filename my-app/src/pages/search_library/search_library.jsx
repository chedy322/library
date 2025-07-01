import React, { useState } from 'react'
import { search_by_city } from '../../utils/dboperation';
import { useNavigate } from 'react-router-dom';
import './search_library.css'
import Single_library_container from '../../components/single_library_container/single_library_container';
function Search_library() {
    const [searchTerm, setSearchTerm] = useState('');
    const [error,setError]=useState(null)
    const [libraries,setLibraries]=useState([])
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const handleSearch = (e) => {
        e.preventDefault();
        search_by_city(searchTerm,setError,setLibraries,setLoading);
        setTimeout(()=>{
          setError(null)
      },3000)
      };
      const handle_navigate=(path)=>{
        navigate(path)
      }
  return (
    <div>
    <form onSubmit={handleSearch}>
      <div className="search_div">
        <input
          type="text"
          placeholder="Search by City ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button className="button" type="submit">Search</button>
        </div>
      </form>
{
    loading?
    <p style={{"font-size": "15px","font-weight": "bold"}}>Loading ...</p>:
    (
      <Single_library_container libraries={libraries} handle_navigate={handle_navigate} not_found_msg="No libraries found"/>
    )
}
{
      error && <p style={{color:"red","font-size": "15px","font-weight": "bold"}}>{error}</p>
    }
    </div>
  
  )
}

export default Search_library
