import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { Post, User } from "@prisma/client";

export type PostWithUser = Post & { user: User };

const usePosts = (userId?: string) => {
  const { data, mutate, isLoading, error } = useSWR<PostWithUser[]>(
    userId ? `/api/posts/${userId}` : "/api/posts",
    fetcher
  );

  // ⭐ ALWAYS return an array
  // const safeData = Array.isArray(data) ? data : [];

  return { data, mutate, isLoading, error };
};

export default usePosts;
