import React from 'react'

const Categoryes = () => {
  const cats = ["Music", "Gamming", "TV Shows", "News", "Trending", "Entertainment", "Education ", "Science & Tech ", "Travel ", "Fashion", "Cooking", "Sports", "Pets", "Arts", "Comady", "Blogs"]
  return (
    <div className='flex items-center gap-2 mt-2 ms-2  overflow-x-auto scrollbar-hide '>
      {cats.map(cat => (
        <div key={cat} className=' cursor-pointer bg-secondary text-primary text-xs px-2 py-1 rounded-sm w-fit whitespace-nowrap  inline-block'>
          {cat}
        </div>
      ))}
    </div>
  )
}

export default Categoryes