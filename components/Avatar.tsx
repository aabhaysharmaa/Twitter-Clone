import  { useCallback } from 'react'
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AvatarProps {
	userId?: string;
	isLarge?: boolean;
	hasBorder?: boolean
}


const Avatar = ({
	userId,
	isLarge,
	hasBorder
}: AvatarProps) => {
	const router = useRouter();
	const { data } = useUser(userId);
	console.log("Avatar Profile Data : ", data)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onClick = useCallback((event: any) => {
		event.stopPropagation();
		const url = `/users/${userId}`;
		router.push(url)
	}, [router, userId])
	return (
		<div className={`
		 ${hasBorder ? "border-4 border-black" : ""}
		 ${isLarge ? "h-32" : "h-12"}
		 ${isLarge ? "w-32" : "w-12"}
		 rounded-full hover:opacity-90
		  cursor-pointer
		  relative
		 `}>
			<Image src={data?.profileImage || "/default.jpeg"} alt='Avatar' onClick={onClick} width={200} height={200} style={{
				objectFit: "cover",
				borderRadius: "100%",
			}} />
		</div>
	)
}

export default Avatar