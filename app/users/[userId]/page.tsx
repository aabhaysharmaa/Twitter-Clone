"use client";

import Header from '@/components/Header';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import React from 'react'
import UserHero from '@/components/UserHero';
import UserBio from '@/components/UserBio';

const UserView = () => {
	const params = useParams();
	const userId = params.userId;
	const { data: fetchedUser, isLoading } = useUser(userId);
	if (isLoading || !fetchedUser) {
		return <div className='h-full flex items-center justify-center'>
			<ClipLoader size={80} color='lightblue' />
		</div>
	}
	return (
		<>
			<Header label={fetchedUser?.name} showBackArrow />
			<UserHero userId={userId as string} />
			<UserBio userId={userId as string} />
		</>

	)
}

export default UserView