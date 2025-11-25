import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Avatar from './Avatar';

interface UserHeroProps {
	userId: string;
}

const UserHero = ({ userId }: UserHeroProps) => {
	const { data: fetchedUser } = useUser(userId);
	return (
		<div>
			<div className="bg-neutral-700 h-44 relative">
				{/* {fetchedUser && ( */}
				<Image
					src={fetchedUser?.coverImage || "/banner.png"}
					alt="Cover Image"
					fill
					style={{ objectFit: 'cover' }}
				/>
				{/* )} */}
				<div className="px-5 pb-5 absolute -bottom-20 ">
					<Avatar userId={userId} isLarge hasBorder />
				</div>
			</div>

		</div>
	)
}

export default UserHero