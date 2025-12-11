"use client";

import CommentFeed, { CommentWithUser } from "@/components/CommentFeed";
import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface Params {
  userId: string;
}

const Posts: React.FC = () => {
  const params = useParams() as unknown as Params; // type the route params
  const { userId } = params;

  const { data, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={58} color="lightblue" />
      </div>
    );
  }

  // Type the comments if data exists
  const comments: CommentWithUser[] = data?.comment || [];

  return (
    <>
      <Header label="Posts" showBackArrow />
      <PostFeed userId={userId} />
      <Form isComment placeholder="Tweet Your reply" postId={userId} />
      <CommentFeed comments={comments} />
    </>
  );
};

export default Posts;
