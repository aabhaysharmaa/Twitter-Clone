"use client";
import LoginModalStore from '@/hooks/useloginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import Avatar from './Avatar';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import usePosts from '@/hooks/usePosts';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';
interface PostItemProps {
	userId: string,
	data: Record<string, any>
}

const PostItem = ({ userId, data }: PostItemProps) => {
	const { data: userData, mutate } = usePosts(userId)
	const { hasLiked, toggleLike } = useLike({ postId: data.id, userId: data.user.id, data });

	const { data: currentUser } = useCurrentUser();
	const router = useRouter();
	const loginModal = LoginModalStore();
	//redirecting to the individual user
	const goToUser = useCallback((event: any) => {
		event.stopPropagation();
		router.push(`/users/${data?.user?.id}`)
	}, [router, data?.user?.id]);

	//redirecting to the individual  post

	const goToPost = useCallback(() => {
		router.push(`/posts/${data.user.id}`)
		mutate();
	}, [router, data.user.id, mutate]);

	const onLike = useCallback((event: any) => {
		event.stopPropagation();
		if (!currentUser) {
			return loginModal.onOpen();
		}
		toggleLike();
		mutate()
	}, [toggleLike, currentUser, loginModal , mutate]);
	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}
		return formatDistanceToNowStrict(new Date(data.createdAt))
	}, [data?.createdAt]);
	return (
		<div onClick={goToPost}>
			<div className="border-b border-neutral-500 cursor-pointer p-5 hover:bg-neutral-900 transition">
				<div className="flex flex-row items-start gap-3 ">
					<Avatar userId={data.user.id} />
					<div className="">
						<div className="flex flex-row items-center  gap-2">
							<p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{data.user.name}</p>
							<span onClick={goToUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block truncate w-[120px]' >@{data.user.username}</span>
							<span className='text-neutral-500 text-sm'>{createdAt}</span>
						</div>
						<div className="mt-1">{data.content}</div>
						<div className="flex  flex-row items-center text-neutral-500 gap-5 ">
							<div className="flex  flex-row items-center text-neutral-500 cursor-pointer transition gap-2 hover:text-sky-500 ">
								<AiOutlineMessage size={20} />
								<p className=''>{data.comments?.length || 0}</p>
							</div>
							<div onClick={onLike} className="flex  flex-row items-center text-neutral-500 cursor-pointer transition gap-2 hover:text-red-500">
								{hasLiked ? <AiFillHeart size={20} className='text-red-400' /> : <AiOutlineHeart size={20} />}
								<p className={hasLiked ? "text-red-500" : "text-neutral-400"}  >{data?.likeIds?.length || 0}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostItem;