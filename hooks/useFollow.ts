"use client";


import axios from "axios";
import { useCurrentUser } from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import { useCallback, useMemo } from "react";
const UseFollow = (userId: string) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const { mutate: mutateFetchedUser } = useUser(userId);
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
			await axios.post("/api/follow", { userId })
			mutateCurrentUser();
			mutateFetchedUser();
			toast.success("success")
		} catch (error) {
			console.log("Error in toggle Like : ", error)
			toast.error("Something went Wrong!")
		} finally {
		}
	}, [currentUser, loginModal, mutateCurrentUser, mutateFetchedUser, userId])
	return {
		isFollowing, toggleFollow
	}
}

export default UseFollow