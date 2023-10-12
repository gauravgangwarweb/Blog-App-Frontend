"use client"

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [image, setImage] = useState(undefined)
  const avatar = Cookies.get('profileImg')
  const router = useRouter()

  useEffect(() => {
    setImage(avatar)
  }, [])

  const handleClick = () => {
    router.push("/")
  }

  return (
    <div className="items-center fixed w-full px-3">
      <div className="w-full flex justify-between px-4 py-3 bg-[#fff]">
        <img src="blog.png" alt="" className="w-[120px]" onClick={handleClick} />
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
      <hr className="border-[#ff0000] border-[1px]" />
    </div>
  );
};

export default Navbar;