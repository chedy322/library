import React from 'react'
import { useNavigate } from 'react-router'
import './nav.css'
function Nav() {
    const navigate = useNavigate();
    const handleClick = (path) => {
    //   setSelected(label);
      navigate(path);
    };
  return (
    <div className='nav_div'>
      <ul>
        <li onClick={()=>handleClick("/")}>home</li>
        <li onClick={()=>handleClick("/Libraries")}>Libraries</li>
        <li onClick={()=>handleClick("/search_library")}>search</li>
      </ul>
    </div>
  )
}

export default Nav
