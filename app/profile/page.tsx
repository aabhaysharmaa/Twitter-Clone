"use client";

import Header from '@/components/Header';
import PostFeed from '@/components/PostFeed';
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const Profile = () => {

  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Header label='Profile' showBackArrow />
      <UserHero userId={currentUser?.id as string} />
      <UserBio userId={currentUser?.id as string} />
      <PostFeed />
    </>
  )
}

export default Profile