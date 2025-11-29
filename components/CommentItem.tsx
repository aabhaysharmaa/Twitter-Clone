/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import Avatar from './Avatar';
import { AiOutlineMessage } from 'react-icons/ai';
import useLike from '@/hooks/useLike';


interface CommentItemProps {
	data?: Record<string, any>
}


const CommentItem = ({ data }: CommentItemProps) => {
	const router = useRouter();
	const { hasLiked, toggleLike } = useLike({ postId: data?.id, userId: data?.user.id, data });
	const goToUser = useCallback((event: any) => {
		event.stopPropagation();
		router.push(`/api/users/${data?.user.id}`)
	}, [router, data?.user.id]);

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}
		return formatDistanceToNowStrict(new Date(data?.createdAt))
	}, [data?.createdAt])
	return (
		<div className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
			<div className="flex flex-row items-center gap-3">
				<Avatar userId={data?.user.id} />
				<div className="">
					<div className="flex flex-row items-center gap-2">
						<p className='font-semibold cursor-pointer hover:underline'>{data?.user?.name}</p>
						<span className='text-neutral-500 cursor-pointer hover:underline hidden md:block truncate w-[120px]'>@{data?.user?.name}</span>
						<span>{createdAt} </span>
					</div>
					<div className="">{data?.content}</div>

				</div>
			</div>

		</div>
	)
}

export default CommentItem;