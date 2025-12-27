
import React, { useEffect, useState } from 'react'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
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
        <Route path='/shorts' element={<Shorts />} />
        <Route path='/mobilepro' element={<MobileProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='/viewchannel' element={<ViewChannel />} />
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