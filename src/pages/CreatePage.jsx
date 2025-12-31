import React from 'react'
import { FaVideo, FaPlay, FaPen, FaList } from "react-icons/fa"

const CreatePage = () => {

  const options = [
    {
      name: "Video",
      icon: <FaVideo />
    },
    {
      name: "Short",
      icon: <FaPlay />
    },
    {
      name: "Community Post",
      icon: <FaPen />
    },
    {
      name: "PlayList",
      icon: <FaList />
    },
  ]


  return (
    <section className=''>
      <div className="border-b pb-2">

        <h2 className='text-3xl font-bold'>Create</h2>
        <p>Choose what type of content you want to create</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-3">
        {
          options.map((ele, i) => (
            <div className='bg-secondary/50 hover:bg-secondary grid place-content-center cursor-pointer h-[250px] border-2 hover:border-red-600 group rounded-lg'>
              <div className="mx-auto h-10 grid place-content-center rounded-full w-10 bg-secondary/60 group-hover:bg-secondary/10">{ele.icon}</div>
              <div className="text">Create {ele.name}</div>
            </div>
          ))
        }


      </div>

    </section>
  )
}

export default CreatePage