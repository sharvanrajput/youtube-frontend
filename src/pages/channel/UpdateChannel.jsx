import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/favicon.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createYoutubeChannel } from '@/redux/slice/ChannelSlice'
import { me } from '@/redux/slice/AuthSlice'
import { ClipLoader } from 'react-spinners'


const UpdateChannel = () => {
  const { userData } = useSelector(state => state.user)
  const { loading, channelData } = useSelector(state => state.channel)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState(null)
  const [banner, setBanner] = useState(null)

    const [channel, setChannel] = useState(userData?.channel?.name)
  const [description, setdescription] = useState(userData?.channel?.description)
  const [category, setCategory] = useState(userData?.channel?.category)

  const handleCreateChannel = async () => {
    try {
      const formData = new FormData()

      formData.append("name", channel)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("avatar", profile)
      formData.append("banner", banner)

      await dispatch(createYoutubeChannel(formData)).unwrap()
      await dispatch(me()).unwrap()
      channelData && console.log(channelData)

      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between bg-background items-center px-6 py-3 border-b">
        <Link to="/">
          <div className="flex gap-1 items-center">
            <img src={logo} className="w-[30px]" alt="logo" />
            <h1 className="font-bold">Youtube</h1>
          </div>
        </Link>

        <Avatar className="size-10">
          <AvatarImage
            src={
              userData?.profilePhoto
                ? userData.profilePhoto
                : "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback>
            {userData?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* MAIN */}
      <div className="h-[90vh] w-full grid place-items-center bg-background px-4">

        {/* STEP 1 */}
        {step === 1 && (
          <Card className="md:max-w-[400px] w-full">
            <CardHeader>
              <CardTitle>How you'll appear</CardTitle>
              <CardDescription>
                Choose your profile picture & channel name
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Label
                htmlFor="profile"
                className="mb-3 border-2 border-dashed rounded-full w-[100px] h-[100px] overflow-hidden mx-auto flex items-center justify-center cursor-pointer"
              >
                {profile ? (
                  <img
                    src={URL.createObjectURL(profile)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={50} />
                )}

                <Input
                  type="file"
                  id="profile"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </Label>

              <Label className="mb-2 block">Enter Channel Name</Label>
              <Input
                type="text"
                value={channel}
                className="mb-4"
                placeholder="Your channel name"
                onChange={(e) => setChannel(e.target.value)}
              />

              <Button
                className="w-full"
                disabled={!channel}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>

              <Link to="/">
                <Button variant="link" className="mt-2">
                  Back to home
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Card className="md:max-w-[400px] w-full">
            <CardHeader>
              <CardTitle>Your Channel</CardTitle>

            </CardHeader>

            <CardContent>
              <div className="flex justify-center mb-3">
                <div className="border-2 border-dashed rounded-full w-[100px] h-[100px] overflow-hidden flex items-center justify-center">
                  {profile ? (
                    <img
                      src={URL.createObjectURL(profile)}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={50} />
                  )}
                </div>
              </div>

              <p className="text-center font-medium mb-4">
                {channel}
              </p>

              <Button className="w-full" onClick={() => setStep(3)}>
                Contniue Create Channel
              </Button>

              <Button
                variant="link"
                className="w-full mt-2"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        )}
        {/* STEP 1 */}
        {step === 3 && (
          <Card className="md:max-w-[400px] w-full">
            <CardHeader>
              <CardTitle>How you'll appear</CardTitle>
              <CardDescription>
                Choose your profile picture & channel name
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Label
                htmlFor="profile"
                className="mb-3 border-0 border-dashed rounded-2xl w-full h-[100px] overflow-hidden mx-auto flex items-center justify-center cursor-pointer"
              >
                {banner ? (
                  <img
                    src={URL.createObjectURL(banner)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="border-2 flex justify-center items-center border-dashed rounded-2xl w-full h-[100px]">
                    <span>Pick a BAnner</span>
                  </div>
                )}

                <Input
                  type="file"
                  id="profile"
                  className="hidden"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </Label>

              <Label className="mb-2 block">Channel Description</Label>
              <Textarea
                type="text"
                value={description}
                className="mb-4"
                placeholder="Channel Description"
                onChange={(e) => setdescription(e.target.value)}
              />
              <Label className="mb-2 block">Enter Channel Category</Label>
              <Input
                type="text"
                value={category}
                className="mb-4"
                placeholder="Channel Category"
                onChange={(e) => setCategory(e.target.value)}
              />

              <Button
                className="w-full"
                disabled={!channel}
                onClick={handleCreateChannel}
              >
                {loading ? <ClipLoader /> : "Continue"}

              </Button>

              <Link to="/">
                <Button variant="link" className="mt-2" onClick={() => setStep(2)}>
                  Back to home
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

      </div>
    </>
  )
}

export default UpdateChannel