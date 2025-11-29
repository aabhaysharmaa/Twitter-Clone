"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";
const useNotifications = (userId?: string) => {
	const { data, error, isLoading, mutate } = useSWR(userId ? `/api/notifications/${userId}` : null , fetcher);
	return { data, error, isLoading, mutate }
}


export default useNotifications;