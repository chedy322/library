import './App.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import Home from './pages/home/home'
import Libraries from './pages/get_libraries/libraries'
import Library from './pages/get_library/library'
import Layout from './utils/Layout'
import Search_library from './pages/search_library/search_library'
import Create_library from './pages/create_library/create_library'



  function App() {
    const router=createBrowserRouter([
      {
        path: '/',
        element:<Layout/>,
        children:[
          {
            index:true,
            element: <Home/>,
          },{
            path: '/libraries',
            element: <Libraries/>,
          },{
            path: '/library/:id',
            element: <Library/>,
          },{
            path:'/search_library',
            element:<Search_library/>
          },{
            path:'/create_library',
            element:<Create_library/>
          },
        ]
    
      },
    ])
      return(
        <>
        <RouterProvider router={router}/>
        </>
      )
    }
    

export default App
