"use client";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback, useMemo } from "react";
import LoginModalStore from "./useloginModal";
import toast from "react-hot-toast";
import axios from "axios";
const useLike = (
	{ postId, userId, data }: { postId?: string, userId?: string, data: Record<string, any> }
) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const {  mutate: mutateFetchedPost } = usePost(postId);
	const { mutate: mutateFetchedPosts } = usePosts(userId);
	const loginModal = LoginModalStore();
	const hasLiked = useMemo(() => {
		const list = data?.likeIds || [];
		return list.includes(currentUser?.id);
	}, [data?.likeIds, currentUser?.id]);
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
			mutateCurrentUser();
			mutateFetchedPost();
			mutateFetchedPosts();
			toast.success("success");
		} catch (error) {
			toast.error("Something went Wrong!");
			console.log((error as Error).message)
		}
	}, [loginModal, currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, mutateCurrentUser])
	return {
		hasLiked,
		toggleLike,

	}

}
export default useLike;
















