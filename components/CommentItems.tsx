import React, { useMemo } from 'react'
import Avatar from './Avatar';

import { formatDistanceToNowStrict } from 'date-fns';

import { comment, User } from "@prisma/client";
const CommentItems = ({ data }: { data: comment & { user: User } }) => {

	const createdAt = useMemo(() => {
		if (!data?.createdAt) return null
		return formatDistanceToNowStrict(new Date(data?.createdAt))
	}, [data?.createdAt])

	return (
		<div className='flex flex-col border-b border-neutral-500 p-5 cursor-pointer transition hover:bg-neutral-900'>
			<div className="flex flex-row items-center gap-3">
				<Avatar userId={data?.user?.id} />
				<div className="">
					<div className="flex flex-row  items-center gap-3">
						<p className='font-semibold hover:underline cursor-pointer'>{data?.user?.name}</p>
						<span className='text-neutral-500 cursor-pointer hover:underline hidden md:block truncate-[120px]'>{data?.user?.username}</span>
						<span>{createdAt}</span>
					</div>
					<div className="">
						{data?.content}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CommentItems