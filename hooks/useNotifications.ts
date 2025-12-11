"use client";

import fetcher from "@/libs/fetcher";
import useSWR from "swr";


const useNotifications = () => {
	const { data, mutate } = useSWR(`/api/notifications/`, fetcher);
	return { data, mutate }
}

export default useNotifications