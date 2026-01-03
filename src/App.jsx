
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Layout from './layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { api } from './redux/slice/baseurl'
import { me } from './redux/slice/AuthSlice'
import { Search } from 'lucide-react'
import Shorts from './pages/Shorts'
import MobileProfile from './pages/MobileProfile'
import ForgotPassword from './pages/ForgotPassword'
import CreateChannel from './pages/channel/CreateChannel'
import ViewChannel from './pages/channel/ViewChannel'
import UpdateChannel from './pages/channel/UpdateChannel'
import { toast } from 'sonner'
import CreatePage from './pages/CreatePage'
import CreateVideo from './pages/Video/CreateVideo'
import CreateShorts from './pages/short/CreateShorts'
import CreatePost from './pages/posts/CreatePost'
import CreatePlaylist from './pages/playlist/CreatePlaylist'


const ProdtctedRoute = ({ userdata, children }) => {
  const navigate = useNavigate()

  if (!userdata) {
    toast("Login Is Necessary", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      }
    })
    return <Navigate to="/" replace />
  }
  return children
}

const App = () => {
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(me()).unwrap()
  }, [])

  useEffect(() => {
    if (userData) {
      navigate("/")
    }
  }, [userData])


  return (
    <Routes>

      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/shorts' element={<ProdtctedRoute userdata={userData}><Shorts /></ProdtctedRoute>} />
        <Route path='/mobilepro' element={<ProdtctedRoute userdata={userData}> <MobileProfile /></ProdtctedRoute>} />
        <Route path='/search' element={<ProdtctedRoute userdata={userData}><Search /></ProdtctedRoute>} />
        <Route path='/viewchannel' element={<ProdtctedRoute userdata={userData} ><ViewChannel /></ProdtctedRoute>} />
        <Route path='/create' element={<ProdtctedRoute userdata={userData} ><CreatePage /></ProdtctedRoute>} />
        <Route path='/create-video' element={<ProdtctedRoute userdata={userData} ><CreateVideo /></ProdtctedRoute>} />
        <Route path='/create-short' element={<ProdtctedRoute userdata={userData} ><CreateShorts /></ProdtctedRoute>} />
        <Route path='/create-post' element={<ProdtctedRoute userdata={userData} ><CreatePost /></ProdtctedRoute>} />
        <Route path='/create-playlist' element={<ProdtctedRoute userdata={userData} ><CreatePlaylist /></ProdtctedRoute>} />
      </Route>

      <Route path='/updatechannel' element={<UpdateChannel />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/forgotpass' element={<ForgotPassword />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/createchannel' element={<CreateChannel />} />

    </Routes>
  )
}

export default App