"use client";
import React from "react";
import Link from "next/link";
import { useRouter} from 'next/navigation'

const NavBar = () => {
   const router = useRouter()
   const handleSelectedRoute = (e: any)=>{
      const targetRoute = e.target.value
      router.push(targetRoute)
   }
  return (
    <div className="m-8">
      <div className="flex flex-row ">
        <div className="flex w-1/6 h-16 bg-pink text-blue-800 text-lg justify-center items-center">
          <Link href="/" className="text-center">
            HOME
          </Link>
        </div>
        <div className="flex w-1/6 bg-green text-red-800 justify-center items-center">
          <Link href="/restaurants">RESTAURANT</Link>
        </div>
        <div className="flex w-1/6 bg-orange text-green-800 justify-center items-center">
          <Link href="/contact">CONTACT</Link>
        </div>
        <div className="flex w-1/6 bg-blue text-yellow-600 justify-center items-center">
          <Link href="/author">ABOUT AUTHOR</Link>
        </div>
       <div className="flex w-1/6 justify-center items-center">
         <select name="" id="" onChange={handleSelectedRoute} value={router.pathname}>
               <option value="">Email Address</option>
               <option value="/profile">My Profile</option>
            <option value="/logout">Log out</option>
         </select>
       </div>
        {/* end dropdown */}
        <div className="flex w-1/6 bg-blue text-yellow-600 justify-center items-center">
          <Link href="/login">LOG IN</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
