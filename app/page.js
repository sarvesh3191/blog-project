"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
  
    fetch(process.env.NEXT_PUBLIC_API_URL+'/posts')
    .then((res) => res.json() )
    .then(res => setPosts(res))
  },[]); 

  const searchPost = (e) => {
    if (e.type == 'keydown' && e.key !== 'Enter') {
        return;
    }

    setSearch(true);
    fetch(process.env.NEXT_PUBLIC_API_URL+'/posts?q='+inputRef.current.value)
      .then((res) => res.json() )
      .then(res => setPosts(res))
      .finally(() => setSearch(false))
  }

  return (
    <>
        <main className="container text-black mx-auto px-4 py-6">
        <h2 className="text-4xl  font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
    
      <div className="flex justify-end px-4">
        <input onKeyDown={searchPost} disabled={search} ref={inputRef} type="text" className="px-4 py-2 border border-gray-900 text-black rounded-md" placeholder="Search..." />
        <button onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-black rounded-md ml-4">{search?'...':'Search'}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 ml-2 mr-3 gap-4">
       {posts.map((post) => (
        <Link href={"/post/"+post._id}>
        
          <div key={post._id} className="border border-gray-200 p-4">
            <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image" />
            <h2 className="text-xl font-semibold mb-2">{post.title }</h2>
            <p className="text-gray-600">{post.short_description}</p>
          </div>
          </Link>
       ))}
      </div>
    </>
  )
}