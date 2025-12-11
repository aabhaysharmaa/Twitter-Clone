"use client";

import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed';
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { redirect } from 'next/navigation';



const Notifications = () => {
  const { data: session } = useCurrentUser();
  if (!session) {

    redirect("/")
  }
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed  />
    </>
  )
}

export default Notifications