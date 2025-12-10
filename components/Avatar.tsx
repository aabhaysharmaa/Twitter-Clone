"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation"
import React, { useCallback } from "react";

interface AvatarProps {
	userId?: string;
	hasBorder?: boolean
	isLarge?: boolean;
	isMid?: boolean
}

const Avatar = ({ userId, hasBorder, isLarge, isMid }: AvatarProps) => {
	const router = useRouter();
	const { data: user } = useUser(userId as string);

	const onClick = useCallback(
		(e: React.MouseEvent<HTMLImageElement>) => {
			e.stopPropagation();
			if (!userId) return;
			router.push(`/users/${userId}`);
		},
		[router, userId]
	);
	return (
		<div className={`${hasBorder ? "border-4 border-black" : ""}  rounded-full ${isLarge ? "h-32 w-32" : "w-12 h-12"} ${isMid ? "h-20 w-20" : ""}
		rounded-full  cursor-pointer
		 relative
		`} onClick={onClick}>
			<Image src={user?.profileImage || "/images/default.jpeg"} alt="avatar" fill
				className=" object-cover rounded-full"
			/>
		</div>
	)
}

export default Avatar