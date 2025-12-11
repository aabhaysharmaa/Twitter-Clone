"use client";
import Header from '@/components/Header'
import PostFeed from '@/components/PostFeed';
// import PostFeed from '@/components/PostFeed';
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
// import { useCurrentUser } from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
const User = () => {
  const params = useParams()
  const userId = params.userId
  // Fetch the profile being viewed by id

  console.log(userId);
  const { data: fetchedUser, isLoading } = useUser(userId as string)
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
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />  
    </>
  )
}

export default User;