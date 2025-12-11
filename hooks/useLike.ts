/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useMemo, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";


const useLike = (postId: string, data : any) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const loginModal = useLoginModal();
	const { mutate: mutatePost } = usePost(postId)
	const { mutate: mutatePosts } = usePosts();
	const [isLoading, setIsLoading] = useState(false)

	const isLiked = useMemo(() => {
		const like = data?.likeIds || []
		return like.includes(currentUser?.id)
	}, [currentUser, data?.likeIds])

	const toggleLike = useCallback(async (e : any ) => {
		e.stopPropagation();
		if (!currentUser) {
			loginModal.onOpen();
			return;
		}
		try {
			setIsLoading(true)
			await axios.post("/api/like", { postId });
			toast.success("success")
			mutateCurrentUser();
			mutatePost()
			mutatePosts()
		} catch (error) {
			console.log("Error in Liked Hook", error)
			toast.error("Something Went Wrongs")
		} finally {
			setIsLoading(false)
		}
	}, [mutateCurrentUser, mutatePost, postId, mutatePosts, loginModal, currentUser])




	return {
		isLiked,
		toggleLike,
		isLoading
	}
}


export default useLike