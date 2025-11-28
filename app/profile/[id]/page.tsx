"use client";
import Header from '@/components/Header';
import PostFeed from '@/components/PostFeed';
import UserBio from '@/components/UserBio';
import UserHero from '@/components/UserHero';
import { useParams } from 'next/navigation';
import React from 'react';

const UserProfile = () => {
	const params = useParams();
	const { id } = params;
	return (
		<div>
			<Header label='Your Profile' showBackArrow />
			<UserHero userId={id as string} />
			<UserBio userId={id as string} />
			<PostFeed userId={id as string} />
		</div>
	)
}

export default UserProfile;