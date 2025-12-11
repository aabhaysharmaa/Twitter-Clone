/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";

const FollowBarItem = () => {
	const { data: users = [] } = useUsers();
	if (users.length === 0) return null;
	return (
		<div className="px-6 py-4 w-full flex items-center justify-center">
			<div className="bg-neutral-800 rounded-lg  hidden max-w-[250px] lg:block p-4">
				<h2 className="font-semibold  text-xl">Who to follow</h2>
				<div className="gap-4 mt-4 flex flex-col">
					{users.map((user : Record<string , any>) => (
						<div className="flex flex-row gap-4" key={user.id}>
							<Avatar userId={user.id} />
							<div className="flex flex-col truncate">
								<p className="font-bold">{user.name}</p>
								<p className="text-slate-200 text-sm font-bold">@{user.username}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default FollowBarItem