"use client";


import fetcher from "@/libs/fetcher";
import useSWR from "swr";



const usePost = (userId: string) => {
	const { data, mutate, error, isLoading } = useSWR(userId ? `/api/posts/${userId}` : null, fetcher);
	return { data, mutate, error, isLoading }
}


export default usePost;