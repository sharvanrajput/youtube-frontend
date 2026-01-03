"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { RiUploadCloud2Line } from "react-icons/ri"
import { z } from "zod"
import { useDispatch, useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import { VideoUpload } from "@/redux/slice/VideoSlice"

const videoSchema = z.object({
  video: z.instanceof(File, { message: "Video is required" }),
  thumbnail: z.instanceof(File, { message: "Thumbnail is required" }),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description too short"),
  tags: z.string().optional(),
})

const CreateVideo = () => {
  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [errors, setErrors] = useState({})

  const { loading } = useSelector(state => state.video)
  const { userData } = useSelector(state => state.user)
  console.log(userData.channel._id)
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    const formValues = {
      video,
      thumbnail,
      title,
      description,
      tags,
    }

    const result = videoSchema.safeParse(formValues)

    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    // ✅ FormData for Multer
    const formData = new FormData()
    formData.append("video", video)
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("channel", userData?.channel?._id)
    formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim)))


    console.log("Form Validated & Ready to Upload")
    await dispatch(VideoUpload(formData)).unwrap()

  }

  return (
    <div className="max-w-2xl mx-auto my-auto">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* VIDEO UPLOAD */}
            <label className="rounded-2xl overflow-hidden cursor-pointer mb-3.5">

              {video ? (
                <div className="space-y-2 mb-3.5">
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    className="w-full h-[220px] rounded-2xl object-cover"
                  />

                  <div className="text-sm text-muted-foreground flex justify-between px-1">
                    <span className="truncate">{video.name}</span>
                    <span>{(video.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed h-[220px] grid place-content-center rounded-2xl mb-3.5">
                  <RiUploadCloud2Line size={45} className="mx-auto text-muted-foreground" />
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Click to upload video
                  </p>
                  <p className="text-center text-xs text-muted-foreground">
                    MP4, WebM supported
                  </p>
                </div>
              )}

              <Input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </label>

            {errors.video && (
              <p className="text-red-500 text-sm">{errors.video}</p>
            )}


            {/* TITLE */}
            <div>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* DESCRIPTION */}
            <div>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* TAGS */}
            <div>
              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* THUMBNAIL UPLOAD */}
            <label className="rounded-lg overflow-hidden">


              {
                thumbnail ? <>
                  <img src={URL.createObjectURL(thumbnail)} className="h-[120px] w-full " alt="" /> {thumbnail.name} </> :
                  <div className="border-2 border-dashed h-[120px] grid place-content-center mb-5 rounded-2xl cursor-pointer">
                    <p className="text-center">Upload Thumbnail</p>
                  </div>
              }

              <Input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </label>
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}


            <Button type="submit" disabled={!title || !description} className="w-full">
              {loading ? <ClipLoader /> : "Create Video"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateVideo
