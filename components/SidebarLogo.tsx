"use client";

import { useRouter } from 'next/navigation'
import { BsTwitterX } from 'react-icons/bs';



const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div className='cursor-pointer rounded-full p-4 size-14 flex items-center justify-center transition hover:bg-blue-400/10 ' onClick={() => router.push("/")} >
      <BsTwitterX size={28} />
    </div>
  )
}

export default SidebarLogo