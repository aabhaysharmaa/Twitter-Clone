

import useNotifications from '@/hooks/useNotifications'
import React, { useEffect } from 'react'


import { Notifications } from "@prisma/client"
import SidebarLogo from './SidebarLogo'
type NotificationType = Notifications


const NotificationsFeed = () => {
	const { data: Notifications = [], mutate: mutateNotifications } = useNotifications() as { data: NotificationType[], mutate: () => void }

	console.log("Notifications Feed : ", Notifications)
	useEffect(() => {
		mutateNotifications()
	}, [mutateNotifications])

	if (Notifications.length === 0) {
		return (
			<div className="w-full p-5 flex justify-center items-center text-neutral-500 text-xl">
				No Notifications
			</div>
		)
	}
	return (
		<div className='flex flex-col'>
			{Notifications?.map((item) => (
				<div className="p-3 flex items-center" key={item.id}>
					<SidebarLogo/>
					<p>{item?.body}</p>
				</div>
			))}
		</div>
	)
}

export default NotificationsFeed