"use client";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback, useMemo } from "react";
import LoginModalStore from "./useloginModal";
import toast from "react-hot-toast";
import axios from "axios";
const useLike = (
	{ postId, userId }: { postId?: string, userId?: string }
) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
	const { data: fetchedPosts, mutate: mutateFetchedPosts } = usePosts(userId);
	const loginModal = LoginModalStore();
	const hasLiked = useMemo(() => {
		const list = fetchedPost?.likeIds || [];
		return list.includes(currentUser?.id);
 
	}, [fetchedPost?.likeIds, currentUser?.id]);
	const toggleLike = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		try {
			let request;
			if (hasLiked) {
				request = () => axios.delete("/api/like", { data: { postId } });
			} else {
				request = () => axios.post("/api/like", { postId });
			}
			await request();
			mutateFetchedPost();
			mutateFetchedPosts();
			toast.success("success");
		} catch (error) {
			toast.error("Something went Wrong!");
			console.log((error as Error).message)
		}
	}, [loginModal, currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts])
	return {
		hasLiked,
		toggleLike,
		fetchedPost
	}

}
export default useLike;
















