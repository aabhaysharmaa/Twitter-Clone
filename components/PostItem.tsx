/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useMemo } from 'react'
import Avatar from './Avatar';
import { Post, User } from '@prisma/client';
// import usePosts from '@/hooks/usePosts';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import useLike from '@/hooks/useLike';
import usePosts from '@/hooks/usePosts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
interface PostItemProps {
	userId?: string;
	data?: Post & { user: User }
}

const PostItem = ({ data, userId }: PostItemProps) => {
	const router = useRouter();
	const { mutate: mutatePosts } = usePosts(userId);
	const {data : currentUser} = useCurrentUser();
	const { isLiked, toggleLike, isLoading } = useLike(data?.id as string, data )
	const goToUser = (e: any) => {
		e.stopPropagation();

		router.push(`/users/${data?.user?.id}`)
	}
	const goToPost = () => {
		// e.stopPropagation();
		mutatePosts();
		router.push(`/posts/${data?.user.id}`)
	}
	const createdAt = useMemo(() => {
		if (!data?.createdAt) return null;
		return formatDistanceToNowStrict(new Date(data?.createdAt))
	}, [data?.createdAt])

	return (
		<div >
			<div onClick={goToPost} className="border-b border-neutral-500  cursor-pointer  p-5 hover:bg-neutral-900 transition ">
				<div className="flex flex-row items-start gap-3">
					<Avatar userId={data?.userId} />
					<div className="">
						<div className="flex flex-row items-center gap-2">
							<p onClick={goToUser} className='font-semibold cursor-pointer hover:underline'>{data?.user?.name}</p>
							<span className='text-neutral-500 cursor-pointer hover:underline hidden md:block truncate w-[120px]' >@{data?.user?.username}</span>
							<span className='text-neutral-500 text-sm'>{createdAt}</span>
						</div>
						<div className="mt-1 ">{data?.content}</div>
						<div className="flex flex-row items-center text-neutral-500 gap-5">
							<div className="flex mt-1 flex-row items-center text-neutral-500 cursor-pointer transition gap-2 hover:text-sky-500">
								<AiOutlineMessage size={20} />
								<p>{currentUser?.comment?.length || 0 }</p>
							</div>
							<div onClick={toggleLike} className="flex mt-1 flex-row items-center text-neutral-500 cursor-pointer transition gap-2 ">
								<button disabled={isLoading} className='cursor-pointer'>

									{isLiked ? <AiFillHeart size={20} className='text-rose-500' /> : <AiOutlineHeart className='hover:text-rose-500' size={20} />}
								</button>
								<p>{data?.likeIds.length || 0}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem