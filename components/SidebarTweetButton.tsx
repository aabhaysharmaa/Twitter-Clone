"use client";


import React, { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';

import LoginModalStore from '@/hooks/useloginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

const SidebarTweetItem = () => {
  const { data: currentUser } = useCurrentUser();
  // const router = useRouter();
  const LoginModal = LoginModalStore();
  const onClick = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen();
    }
  }, [LoginModal, currentUser])
  return (
    <div onClick={onClick}>
      <div className="lg:hidden mt-6 h-16 w-14 flex rounded-full items-center justify-center bg-sky-500 hover:bg-sky-500/80 transition cursor-pointer">
        <FaFeather size={24} />
      </div>
      <div className="hidden lg:block mt-6 px-4 py-2 rounded-full hover:bg-sky-500/90  bg-sky-500 cursor-pointer transition">
        <p className='text-center hidden lg:block font-semibold text-[20px]' >Tweet</p>
      </div>
    </div>
  )
}

export default SidebarTweetItem;