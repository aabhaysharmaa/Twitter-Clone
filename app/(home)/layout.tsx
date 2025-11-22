import SideBar from '@/components/SideBar';
import FollowBar from "@/components/followBar"
import React, { ReactNode } from 'react';
const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className='
		 h-screen bg-black'>
			<div className="container h-full mx-auto xl:px-30  max-w-6xl">
				<div className=" grid grid-cols-4 h-full">
					<SideBar />
					<div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
						{children}
					</div>
					<FollowBar  />
				</div>
			</div>
		</main>
	)
}

export default HomeLayout