"use client"; 

import SidebarLogo from './SidebarLogo'
import SideBarItem from './SidebarItem'
import TweetButton from './TweetButton'
import { FaHouse } from 'react-icons/fa6'
import { FaBell, FaUser, FaUserPlus } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import useFollow from '@/hooks/useFollow';
import useUser from '@/hooks/useUser';
const SideBar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { data: currentUser } = useCurrentUser();
  console.log("HasNotifications  : ", currentUser?.hasNotifications)
  const { data: user } = useUser();
  const {  toggleFollow } = useFollow(user?.id as string);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    handleResize(); // initialize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sidebarLinks = [
    {
      label: "Home",
      href: "/",
      icon: FaHouse,
      isAuth: false
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FaBell,
      isAuth: true,
      alert: currentUser?.hasNotifications

    },
    {
      label: "Profile",
      href: "/profile",
      icon: FaUser,
      isAuth: true
    }
  ]
  return (
    <div className='flex flex-col items-end'>
      <div className="space-y-3  lg:w-[250px] mr-4">
        <SidebarLogo />
        {sidebarLinks.map((item) => (
          <SideBarItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isAuth={item.isAuth}
            alert={item.alert}
          />
        ))}
        {isMobile && (
          <SideBarItem
            label='Follow'
            icon={FaUserPlus}
            href='/follow'
            handleFollowClick={toggleFollow}
          />
        )}
        {!!currentUser && (
          <SideBarItem
            onClick={() => signOut()}
            label='LogOut'
            icon={BiLogOut}
          />
        )}
        <TweetButton />
      </div>
    </div>
  )
}

export default SideBar ;