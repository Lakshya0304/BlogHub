import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {SignUp} from './pages/SignUp'
import {SignIn} from './pages/SignIn'
import {Blogs} from './pages/Blogs'
import {Blog} from './pages/Blog'
import {Publish} from './pages/Publish'

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={ <SignUp/>}/>
        <Route path='/signin' element={ <SignIn/>}/>
        <Route path='/blog/:id' element= {<Blog/>}/>
        <Route path='/blogs' element={ <Blogs/>}/>
        <Route path='/publish' element={ <Publish/> }/>
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App

//lakshya@gmail.com
//One@123456