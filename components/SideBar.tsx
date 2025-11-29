"use client";

import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItems from './SidebarItems';
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetItem from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
const SideBar = () => {
	const { data: currentUser } = useCurrentUser();
	console.log("Has Notifications : ", currentUser?.hasNotifications);
	const items = [
		{
			label: "Home",
			href: "/",
			icon: BsHouseFill,
			auth: false
		},
		{
			label: "Notifications",
			href: "/notifications",
			icon: BsBellFill,
			auth: true,
			alert: currentUser?.hasNotifications
		},
		{
			label: "Profile",
			href: `/profile/${currentUser?.id}`,
			icon: FaUser,
			auth: true
		}
	];
	return (
		<div className=' col-span-1 h-full pr-4 md:pr-6'>
			<div className="flex flex-col  items-end">
				<div className="space-y-2 lg:w-[230px]">
					<SidebarLogo />
					{items.map((item) => (
						<SidebarItems
							key={item.label}
							href={item.href}
							label={item.label}
							icon={item.icon}
							auth={item.auth}
							alert={item.alert}

						/>
					))}
					{currentUser &&
						<SidebarItems icon={BiLogOut} href='/api/register' onClick={() => signOut()} label='Logout' />}
					<SidebarTweetItem />
				</div>
			</div>
		</div>
	)
}

export default SideBar