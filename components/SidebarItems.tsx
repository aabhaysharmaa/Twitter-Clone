import React from 'react'
import { IconType } from 'react-icons'

interface SidebarItemsProps {
	icon: IconType,
	href: string,
	label: string
}

const SidebarItems = ({ icon: Icon, href, label }: SidebarItemsProps) => {
	return (
		<div className='flex flex-col lg:items-start  justify-center '>
			<div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300/10 cursor-pointer lg:hidden">
				<Icon size={28} />
			</div>
			<div className=" hidden lg:flex p-4  relative justify-center  items-center rounded-full hover:bg-slate-300/20  cursor-pointer h-full  gap-4">
				<Icon size={24} />
				<p className='hidden lg:block text-white text-xl' >{label}</p>
			</div>
		</div>
	)
}

export default SidebarItems;
