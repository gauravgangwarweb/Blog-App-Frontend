"use client"

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [image, setImage] = useState(undefined)
  const avatar = Cookies.get('profileImg')

  useEffect(() => {
    setImage(avatar)
  }, [])
  
  return (
    <div className="w-full flex justify-between px-8 py-3 border-b-2 border-gray-500 items-center bg-[#eeeeee] fixed">
      <img src="blog.png" alt="" className="w-[120px]" />
      {image ? (
        <div className="flex items-center gap-3">
          <img src={avatar} alt="" className="w-[45px] rounded-full" />
          <i className="fa-solid fa-angle-down fa-lg text-black"></i>
        </div>
      ) : (
        <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 font-medium text-white px-2.5 py-1.5 rounded-lg">
          <Link href="/login">
            Login
          </Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;