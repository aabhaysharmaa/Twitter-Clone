"use client";
import CommentFeed from "@/components/CommentFeed";
import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
const PostView = () => {
  const params = useParams();
  const { data: fetchedData, isLoading } = useUser(params.id as string);
  if (isLoading || !fetchedData) {
    return (
      <div className="flex justify-center  items-center h-full" >
        <ClipLoader size={58} color="lightblue" />
      </div>
    )
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      {<PostFeed userId={params.id as string} />
      }
      <Form
        postId={params.id as string}
        isComment
        placeholder="Tweet Your reply"
      />
      <CommentFeed comments={fetchedData?.comments} />
    </>
  )
};

export default PostView;
