"use client";

import Header from '@/components/Header';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import React from 'react'
import UserHero from '@/components/UserHero';
import UserBio from '@/components/UserBio';
import PostFeed from '@/components/PostFeed';


const UserView = () => {
	const params = useParams(); // returns { id: '123' }
	const postId = params.userId;
	const { data: fetchedUser, isLoading } = useUser(postId as string);
	if (isLoading || !fetchedUser) {
		return <div className='h-full flex items-center justify-center'>
			<ClipLoader size={80} color='lightblue' />
		</div>
	}
	return (
		<>
			<Header label={fetchedUser?.name} showBackArrow />
			<UserHero userId={postId as string} />
			<UserBio userId={postId as string} />
			<PostFeed userId={postId as string}/>
		</>

	)
}

export default UserView