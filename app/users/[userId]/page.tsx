"use client";

import Header from '@/components/Header';
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import { ClipLoader } from "react-spinners";
const User = () => {
  const params = useParams()
  const postId = params.userId
  const { data: fetchedUser, isLoading } = useUser(postId as string)
  console.log("fetchedUser : ", fetchedUser)
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }
  return (
    <>
      <Header label="User" showBackArrow />
      <UserHero userId={fetchedUser?.id} />
      <UserBio userId={fetchedUser?.id} />
    </>
  )
}

export default User; 