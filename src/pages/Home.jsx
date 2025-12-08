import Categoryes from '@/components/Categoryes'
import { Button } from '@/components/ui/button'
import { logout } from '@/redux/slice/AuthSlice'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (userData) {
      toast.success("welcome")
    }
  }, [userData])

  return (
    <>
      <Categoryes />
 
    </>
  )
}

export default Home