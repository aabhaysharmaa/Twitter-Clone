import Header from '@/components/Header';
import NotificationsFeed from '@/components/NotificationsFeed';

import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';



const Notifications = () => {
  const session = getServerSession(authOptions);
  if (!session) {
    redirect("/")
  }
  return (
    <div>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </div>
  );
};

export default Notifications;
