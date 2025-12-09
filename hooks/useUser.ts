"use client";

import fetcher from "@/libs/fetcher";
import { User } from "@/types/user";
import useSWR from "swr";




const useUser = (userId?: string) => {
	const url = userId ? `/api/users/${userId}` : null
	const { data, error, mutate, isLoading } = useSWR<User>(url, fetcher)
	return { data, error, mutate, isLoading };
}

export default useUser