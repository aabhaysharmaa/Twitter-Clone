"use client";
import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { User } from "@/types/user";



const useUsers = () => {
	const { data, isLoading, mutate } = useSWR<User[]>("/api/users", fetcher)
	return { data, isLoading, mutate };
}

export default useUsers ;