import React from 'react'
import "./single_library_container.css"
function Single_library_container({libraries,handle_navigate,not_found_msg}) {
  return (

   <div className="libraries_div">
            {libraries.length>0 ?
            (
              libraries.map((library)=>(
                <div key={library.id} onClick={()=>handle_navigate(`/library/${library.id}`)}>
                <h2>{library.name}</h2>
               <h5><span>📍</span>{library.city}</h5>
              </div>
            )
          )
        ):
       
         (
              <p>{not_found_msg}</p>
            )}
          </div>
  )
}

export default Single_library_container
