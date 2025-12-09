"use client";

import Avatar from '@/components/Avatar'
import Button from '@/components/Button';
import Header from '@/components/Header'
import useUsers from '@/hooks/useUsers'

const Follow = () => {
	<Header label='Who to Follow' showBackArrow />
	const { data: users = [] } = useUsers();
	if (users.length === 0) return null;
	return (
		<>
			<div className="px-6 py-4 w-full">
				<Header label='Who To Follow' showBackArrow />
				<div className="bg-neutral-800 rounded-lg flex justify-start  mt-5 sm:flex w-full lg:hidden  p-4">
					<div className="gap-4 mt-4 flex flex-col">
						{users.map((user) => (
							<div className="flex flex-row gap-4" key={user.id}>
								<Avatar userId={user.id} isMid />
								<div className="flex flex-col w-[100px] truncate">
									<p className="font-bold text-lg">{user.name}</p>
									<p className="text-neutral-400 text-sm font-bold  ">@{user.username}</p>
								</div>
								<div className="flex mx-5 justify-end mb-4 items-center">
									<Button label='Follow' onClick={() => { }} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Follow