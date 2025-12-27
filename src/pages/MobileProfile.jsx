import { Button } from '@/components/ui/button'
import { GoogleLogin, logout, me } from '@/redux/slice/AuthSlice'
import { signInWithPopup } from 'firebase/auth'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { BiSolidLike } from 'react-icons/bi'
import { FaHistory, FaList } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineSwitchAccount } from 'react-icons/md'
import { PiVideoBold } from 'react-icons/pi'
import { SiYoutubestudio } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, authProvider } from '../../utils/firebase'

const MobileProfile = () => {
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  

  const googleauth = async () => {
    try {

      const res = await signInWithPopup(auth, authProvider)
      const name = res && res.user.displayName
      const email = res && res.user.email
      const profile = res && res.user.photoURL
      if (name && email && profile) {
        await dispatch(GoogleLogin({ name, email, profile })).unwrap();
        dispatch(me())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='md:hidden block  h-screen pt-2.5'>
      {userData && <div className="flex gap-3 items-center mb-3 ">
        <div>
          <div className={"size-20"}>
            <img className='rounded-full' src={userData?.profilePhoto ? userData.profilePhoto : "https://github.com/shadcn.png"} />
          </div>
        </div>
        <div>
          <div className={"py-0 hover:bg-background text-xl font-bold text-primary focus:bg-background"}>{userData?.name}</div>
          <div className={"py-0 hover:bg-background text-md  focus:bg-background"}>{userData?.email}</div>
          <p className={"py-0 text-blue-500 text-md hover:text-blue-600!  hover:bg-background focus:bg-background cursor-pointer"}
            onClick={()=>{userData?.channel ? navigate("/viewchannel") : navigate("/createchannel")}}
          >{userData?.channel ? "Vire Channal" : "Create Channel"}</p>
        </div>
      </div>}

      <div className="flex gap-2 p-4 border-b overflow-auto  ">
        {!userData && <>
          <Button variant={"secondary"} className="" onClick={googleauth}><FcGoogle />    Sign in with Google Account</Button>
          <Button variant={"secondary"} className="" onClick={() => navigate("/signup")} > <User />  Create New Account</Button>
          <Button variant={"secondary"} className="" onClick={() => navigate("/signin")} > <MdOutlineSwitchAccount /> Sign in with Other account</Button>
        </>}
        <Button variant={"secondary"} className="" onClick={() => navigate("")} > <SiYoutubestudio />Pt Studio</Button>
        <Button variant={"secondary"} className="" onClick={() => (dispatch(logout()))} > <LogOut /> Sign Out</Button>
      </div>

      <div className='mt-5'>
        <div>
          <ProfileAction icon={<FaHistory />} text={"History"} />
        </div>
        <div>
          <ProfileAction icon={<FaList />} text={"Playlist"} />
        </div>
        <div>
          <ProfileAction icon={<PiVideoBold />} text={"Save Video"} />
        </div>
        <div>
          <ProfileAction icon={<BiSolidLike />} text={"Liked Videos"} />
        </div>
        <div>
          <ProfileAction icon={<SiYoutubestudio />} text={"PT Studio"} />
        </div>
      </div>


    </div>
  )
}

export default MobileProfile


export const ProfileAction = ({ icon, text, onClick }) => {
  return (
    <Button variant={"ghost"} onClick={onClick} className={"  active:bg-accent "}>
      <span className="text-md">{icon}</span>
      <span className="text-md">{text}</span>
    </Button>
  )
}