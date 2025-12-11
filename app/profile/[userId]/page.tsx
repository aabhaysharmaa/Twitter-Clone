"use client";

import { Post, User } from '@prisma/client';
import PostItem from '@/components/PostItem';
import usePosts from '@/hooks/usePosts';

interface PostFeedProps {
  userId?: string;
}


// Define a type for frontend posts including user
export type PostWithUser = Post & { user: User };

const PostFeed = ({ userId }: PostFeedProps) => {
  // Tell TypeScript that posts include user
  const { data: posts = [] } = usePosts(userId) as { data: PostWithUser[] };

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} userId={userId ?? ""} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
