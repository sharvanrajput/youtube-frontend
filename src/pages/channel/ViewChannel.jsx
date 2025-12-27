import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MdUnsubscribe } from 'react-icons/md'
import { RiUserUnfollowLine } from "react-icons/ri";
import { HiOutlineBell, HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ViewChannel = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [subscriber, setScriber] = useState("Unsubscribe")

  console.log(userData)

  useEffect(() => {
    if (!userData?.channel) {
      navigate("/createchannel")
    }
    navigate("/updatechannel")

  }, userData)

  return (
    <div className="px-4">
      <div className='grid gap-5'>
        <div className="banner h-50 w-full relative   ">
          <img src={userData?.channel?.banner} className='w-full h-full object-cover rounded-lg' alt="" />
        </div>

        <div className="flex gap-5">
          <div className="profile overflow-hidden">
            <img src={userData?.channel?.avatar} className='h-[130px] w-[130px] rounded-full' alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className='text-2xl capitalize font-bold '>{userData?.name}</h1>
            <p className='text-sm capitalize '>@{userData?.name.split(" ")} . <span className='text-muted-foreground'> {300}k subscriber . {936} videos </span></p>
            <p className='text-sm capitalize '> <span className='text-muted-foreground'>{userData?.channel?.description}  Lorem ipsum dolor sit amet...  </span> more </p>
            <Select value={subscriber} >
              <SelectTrigger className=" rounded-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent side="bottom">
                <SelectItem value="Unsubscribe"> <RiUserUnfollowLine /> Unsubscribe</SelectItem>
                <SelectItem value="subscribe"> <HiOutlineBell />  subscribe</SelectItem>
                <SelectItem value="All"> <HiOutlineBellAlert /> All</SelectItem>
                <SelectItem value="None"> <HiOutlineBellSlash /> None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Tabs defaultValue="account" >
            <TabsList className={"bg-background"}>
              <TabsTrigger className={"border-0"} value="Home">Home</TabsTrigger>
              <TabsTrigger className={"border-0"} value="Videos">Videos</TabsTrigger>
              <TabsTrigger className={"border-0"} value="Shorts">Shorts</TabsTrigger>
              <TabsTrigger className={"border-0"} value="Playlists">Playlists</TabsTrigger>
              <TabsTrigger className={"border-0"} value="Posts">Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="Home">
              <div className="min-h-[200px] w-full bg-secondary rounded-md  grid place-content-center">
                <p>No videos </p>

              </div>
            </TabsContent>
            <TabsContent value="Videos">
              <div className="min-h-[200px] w-full bg-secondary rounded-md  grid place-content-center">
                <p>No videos </p>

              </div>
            </TabsContent>
            <TabsContent value="Shorts">
              <div className="min-h-[200px] w-full bg-secondary rounded-md  grid place-content-center">
                <p>No Shorts </p>

              </div>
            </TabsContent>
            <TabsContent value="Playlists">
              <div className="min-h-[200px] w-full bg-secondary rounded-md  grid place-content-center">
                <p>No Playlists </p>

              </div>
            </TabsContent>
            <TabsContent value="Posts">
              <div className="min-h-[200px] w-full bg-secondary rounded-md  grid place-content-center">
                <p>No Posts </p>

              </div>
            </TabsContent>
          </Tabs>
        </div>


      </div>
    </div>
  )
}

export default ViewChannel