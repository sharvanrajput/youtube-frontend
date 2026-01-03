import { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { Button } from './ui/button';

import { GoogleLogin, logout, me } from '@/redux/slice/AuthSlice';
import { signInWithPopup } from 'firebase/auth';
import { LogOut, Plus, Search, User } from 'lucide-react';
import { FaMicrophone } from "react-icons/fa6";
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from "react-icons/io";
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { SiYoutubestudio } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, authProvider } from '../../utils/firebase';
import logo from "../assets/favicon.png";
import Mobolenav from './Mobolenav';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { useSidebar } from './ui/sidebar';
import { useTheme } from "@/components/ThemeProvider"


const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  const googleauth = async () => {
    try {

      const res = await signInWithPopup(auth, authProvider)
      const name = res && res.user.displayName
      const email = res && res.user.email
      const profile = res && res.user.photoURL
      if (name && email && profile) {
        await dispatch(GoogleLogin({ name, email, profile })).unwrap();
        await dispatch(me()).unwrap();
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <header className='   bg-background sticky   top-0 w-full z-20'>
        <nav className='flex px-2  md:justify-between border-b  py-2 justify-between items-center'>

          <div className='flex gap-2 items-center'>

            <Button onClick={toggleSidebar} variant={"ghost"} className={"rounded-full size-10 md:block hidden"} >
              <FiMenu />
            </Button >
            <Link to={"/"} className='md:hidden block '>
              <div className='flex gap-1 items-center'>
                <img src={logo} className='w-[30px]' alt="logo" />
                <h1 className="font-bold">
                  Youtube
                </h1>
              </div>
            </Link>

          </div >

          <div className='flex gap-3 items-center  '>

            <div className='relative md:block hidden'>
              <Input type={"text"} placeholder="Search" className={"lg:w-[450px] w-[300px] py-5 rounded-full focus:ring-0!  "} />
              <Button variant={"secondary"} className={"absolute md:block hidden size-10 top-px right-px rounded-tl-0 rounded-bl-0 rounded-tr-full rounded-br-full"}> <Search className='size-5' /> </Button>
            </div>

            {/* <Link to={"/search"}> */}
            <Button variant={"secondary"} onClick={() => setShowSearch(prev => !prev)} className={"rounded-full size-10 md:hidden block"}>
              <Search className='size-5' />
            </Button>
            {/* </Link> */}
            <Button variant={"secondary"} className={"rounded-full md:block hidden size-10"}>
              <FaMicrophone className='size-5' />
            </Button>

          </div>

          <div className='items-center md:flex hidden  gap-3'>

            {userData?.channel && <Button className={"rounded-full"} variant={"secondary"} onClick={()=> navigate("/create")} >
              <Plus /> Create
            </Button>
            }
            <DropdownMenu className={"md:block hidden"}>
              <DropdownMenuTrigger className={"md:block hidden"}>
                <Avatar>
                  <AvatarImage src={userData?.profilePhoto ? userData.profilePhoto : "https://github.com/shadcn.png"} />
                  <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              {<DropdownMenuContent className={"me-3 p-3"}>
                {userData && <div className="flex items-center mb-3">

                  <div>
                    <Avatar className={"size-10"}>
                      <AvatarImage src={userData?.profilePhoto ? userData.profilePhoto : "https://github.com/shadcn.png"} />
                      <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <DropdownMenuItem className={"py-0 hover:bg-background font-bold text-primary focus:bg-background"}>{userData?.name}</DropdownMenuItem>
                    <DropdownMenuItem className={"py-0 hover:bg-background  focus:bg-background"}>{userData?.email}</DropdownMenuItem>
                    <DropdownMenuItem className={"py-0 text-blue-500 hover:text-blue-600! text-xs hover:bg-background cursor-pointer focus:bg-background"}
                      onClick={() => { userData?.channel ? navigate("/viewchannel") : navigate("/createchannel") }}
                    >{userData?.channel ? "Vire Channal" : "Create Channel"}</DropdownMenuItem>
                  </div>
                </div>}

                {userData && <DropdownMenuSeparator />}

                {!userData &&
                  <>
                    <DropdownMenuItem onClick={googleauth} >
                      <FcGoogle />    Sign in with Google Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/signup")} >
                      <User />  Create New Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/signin")} >
                      <MdOutlineSwitchAccount /> Sign in with Other account
                    </DropdownMenuItem>
                  </>
                }

                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>

                {userData?.channel && <DropdownMenuItem>  <SiYoutubestudio /> Pt Studio</DropdownMenuItem>}

                {userData && <DropdownMenuItem variant='destructive' onClick={() => (dispatch(logout()))} > <LogOut /> Sign out</DropdownMenuItem>}
              </DropdownMenuContent>}
            </DropdownMenu>

          </div>

        </nav >




        <Mobolenav />
        {showSearch && <div className='fixed top-0 px-2 w-full h-screen bg-white md:hidden flex py-2 gap-1 '>
          <Input type={"text"} placeholder="Search" className={"w-full   rounded-full focus:ring-0!  "} />
          <Button variant={"ghost"} className={"  size-10 top-px right-px rounded-full"} onClick={() => setShowSearch(prev => !prev)}>  <IoMdClose className='size-5' /> </Button>
          <Button variant={"ghost"} className={"rounded-full    "}>
            <FaMicrophone className='' />
          </Button>

        </div>}

      </header >

    </>
  )
}

export default Navbar