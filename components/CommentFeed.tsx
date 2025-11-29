import React from 'react';
import CommentItem from './CommentItem';

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  postId: string;
  user?: {
    id: string;
    name: string;
    username: string;
  };
};interface CommentFeedProps {
  comments?: Comment[]
}


const CommentFeed = ({ comments }: CommentFeedProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}
export default CommentFeed;
