"use client";
import  { useEffect } from 'react'

type Notification = {
  id: string;
  body: string;
  // add more fields if needed, e.g.:
  createdAt?: Date;
  userId?: string;
};


import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';
import { BsTwitterX } from 'react-icons/bs';
const NotificationsFeed = () => {
	const { data: currentUser } = useCurrentUser();
	const { data: notifications = [], mutate: mutateNotifications } = useNotifications(currentUser?.id);
	useEffect(() => {
		mutateNotifications();
	}, [mutateNotifications]);

	if (notifications.length === 0) {
		return (
			<div className="text-center text-xl  text-neutral-500 mt-4 "> No Notifications</div>
		)
	}

	return (
		<div className='flex flex-col'>
			{notifications.map((notifications: Notification) => (
				<div className="flex flex-row items-center p-6 gap-4 border-b border-neutral-800" key={notifications.id}>
					<BsTwitterX size={35} />
					<p>{notifications.body}</p>
				</div>
			))}
		</div>
	)
}

export default NotificationsFeed