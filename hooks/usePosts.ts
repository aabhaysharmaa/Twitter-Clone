"use client"


import useSWR from "swr";
import fetcher from "@/libs/fetcher";
const usePosts = (userId?: string) => {
	const url = userId ? `/api/posts/${userId}` : "/api/posts"
	const { data, isLoading, mutate, error } = useSWR(url, fetcher);
	return { data, isLoading, mutate, error }
}

export default usePosts