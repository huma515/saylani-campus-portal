import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Main from '../components/main'
import PostPage from '../components/PostPage'
import Admin from '../components/Admin'
import NotFound from '../components/NotFound'


const RouterApp = () => {
  return (
   <BrowserRouter>  
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/home' element={<Main/>}/>
<Route path='/profile' element={<PostPage/>}/>
<Route path='/dashboard' element={<Admin/>}/>
<Route path='/*' element={<NotFound/>}/>
</Routes>
   </BrowserRouter>
  )
}

export default RouterApp