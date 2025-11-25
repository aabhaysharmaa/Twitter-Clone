"use client";
import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUser = (userId: string) => {
  // Always call the hook unconditionally
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
