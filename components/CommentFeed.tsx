import React from "react";
import CommentItems from "./CommentItems";
import { comment, User } from "@prisma/client";

// Define a type for comment including user
export type CommentWithUser = comment & { user: User };

interface CommentFeedProps {
  comments: CommentWithUser[]; // array of comments with user info
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  if (!comments || comments.length === 0) return null;

  return (
    <>
      {comments.map((comment) => (
        <CommentItems key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
