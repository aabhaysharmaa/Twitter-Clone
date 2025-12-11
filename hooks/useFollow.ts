"use client";


import axios from "axios";
import { useCurrentUser } from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import { useCallback, useMemo, useState } from "react"; 
interface FollowResponse {
	updatedCurrentUser: {
		id: string;
		name: string;
		username: string;
	};
	updatedTargetUser: {
		id: string;
		name: string;
		username: string;
	}
}

const useFollow = (userId: string) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const { mutate: mutateFetchedUser } = useUser(userId);
	const [isLoading, setIsLoading] = useState(false)
	const loginModal = useLoginModal();
	const isFollowing = useMemo(() => {
		const list = currentUser?.followingIds || []
		return list.includes(userId)
	}, [currentUser?.followingIds, userId])
	const toggleFollow = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		try {
			setIsLoading(true)
			const res = await axios.post<FollowResponse>("/api/follow", { userId });
			mutateCurrentUser();
			mutateFetchedUser();
			if (!isFollowing) {
				toast.success(`Following ${res?.data?.updatedTargetUser?.name}`)
			}
			if (isFollowing) {
				toast.success(`unFollowed ${res?.data?.updatedTargetUser?.name}`)

			}
			// toast.success(`Following ${res?.data?.username}`)
		} catch (error) {
			console.log("Error in toggle Like : ", error)
			toast.error("Something went Wrong!")
		} finally {
			setIsLoading(false)
		}
	}, [currentUser, loginModal, mutateCurrentUser, mutateFetchedUser, userId, isFollowing])
	return {
		isFollowing, toggleFollow, isLoading
	}
}

export default useFollow ;