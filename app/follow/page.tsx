"use client";

import Avatar from '@/components/Avatar';
import FollowBar from '@/components/followBar'
import useUsers from '@/hooks/useUsers';
import React from 'react'

const Follow = () => {
	 const { data: users = [] } = useUsers();
  if (users.length === 0) return null;
  return (
	<div className='flex justify-center items-center'>
	    <div className='px-6 py-4 w-full'>
      <div className={`bg-neutral-800 rounded-lg min-w-[250px] lg:hidden  block  p-4  `}>
        <h2 className='text-xl font-semibold'>Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div className="flex flex-row gap-4" key={user.id}>
              <Avatar userId={user.id} isHover />
              <div className="flex flex-col ">
                <p className='text-white font-semibold'>{user.name}</p>
                <p className={`text-white font-semibold truncate w-[100px] `}>@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
	</div>
  )
}

export default Follow