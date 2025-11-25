"use client";

import React from 'react';
import useUsers from '@/hooks/useUsers';
import Avatar from './Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
const FollowBar = () => {
  const { data: users = [] } = useUsers();
  console.log("Data Users : ", users)
  if (users.length === 0) return null;
  return (
    <div className='px-6 py-4 hidden lg:block'>
      <div className="bg-neutral-800 rounded-lg  p-4 lg:w-[250px] max-md:w-[200px]">
        <h2 className='text-xl font-semibold'>Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div className="flex flex-row gap-4" key={user.id}>
              <Avatar userId={user.id} />
              <div className="flex flex-col ">
                <p className='text-white font-semibold'>{user.name}</p>
                <p className='text-white font-semibold'>@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar