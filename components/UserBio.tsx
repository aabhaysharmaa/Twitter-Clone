import { useCurrentUser } from "@/hooks/useCurrentUser"
import Button from "./Button";
import useUser from "@/hooks/useUser";
import { BiCalendar } from "react-icons/bi";
import { useMemo } from "react";
import { format } from "date-fns";
import useEditModal from "@/hooks/useEditModal";
import useLoginModal from "@/hooks/useLoginModal";
import UseFollow from "@/hooks/useFollow";
interface UserBioProps {
	userId: string
}

const UserBio = ({ userId }: UserBioProps) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedUser } = useUser(userId);
	const { toggleFollow, isFollowing , isLoading } = UseFollow(userId);
	const editModal = useEditModal();
	const loginModal = useLoginModal();
	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) return null;
		return format(new Date(fetchedUser.createdAt), "MMMM yyyy")
	}, [fetchedUser])

	return (
		<div className="border-b border-neutral-800 pb-4 hover:bg-neutral-900/50 transition">
			<div className="flex justify-end mx-4 my-4">
				{fetchedUser?.id === currentUser?.id ? (
					<Button label="Edit" secondary onClick={currentUser ? editModal?.onOpen : loginModal.onOpen} />
				) : <Button label={isFollowing ? "unfollow" : "Follow"} isLoading={isLoading} onClick={ toggleFollow} />}
			</div>
			<div className="mt-8 px-4">
				<p className="text-white text-2xl font-semibold">{fetchedUser?.name}</p>
				<p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
			</div>
			<div className="flex flex-col mt-5  gap-6">
				<p className="mx-5">{fetchedUser?.bio}</p>

				<div className="flex  flex-row mx-5  items-center  gap-2 text-neutral-500">
					<BiCalendar size={24} />
					<p>Joined {createdAt}</p>
				</div>
				<div className="flex  mx-5  items-center flex-row gap-6">
					<div className="flex flex-row items-center gap-1 ">
						{/* Following Count  */}
						<p>{fetchedUser?.followingIds?.length}</p>
						<p className="text-neutral-500">Following</p>
						{/* Follower Count  */}
					</div>
					<div className="flex gap-1">
						<p>{fetchedUser?.followerIds?.length}</p>
						<p className="text-neutral-500">Follower</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserBio;