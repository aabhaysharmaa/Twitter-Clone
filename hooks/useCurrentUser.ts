"use client";



import fetcher from "@/libs/fetcher";
import { User } from "../types/user" ;
import useSWR from "swr";
export const useCurrentUser = () => {
	const { data, error, isLoading, mutate } = useSWR<User>("/api/currentUser",fetcher)
	return { data, error, isLoading, mutate }
}

