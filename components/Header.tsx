"use client";


import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';
interface HeaderProps {
	label: string,
	showBackArrow: boolean,
}

const Header = ({ label, showBackArrow }: HeaderProps) => {
	const router = useRouter();
	const handelBack = useCallback(() => {
		router.back()
	}, [router]);

	return (
		<div className='border-b border-neutral-800 p-5'>
			<div className="flex flew-row items-center gap-2">
				{showBackArrow && (
					<BiArrowBack onClick={handelBack} size={20} className='cursor-pointer hover:opacity-70 transition' />
				)}
				<h1 className='text-xl font-semibold' >{label}</h1>
			</div>
		</div>
	)
}

export default Header