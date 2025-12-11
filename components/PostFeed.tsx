
"use client";


import usePosts from "@/hooks/usePosts"
import PostItem from "./PostItem";



import { Post, User } from "@prisma/client";
type PostFeedProps = Post & { user: User }



const PostFeed = ({ userId }: { userId?: string }) => {
	const { data: posts = [] } = usePosts(userId) as { data: PostFeedProps[] };
	console.log("POST FEED : ", posts)
	return (
		<>
			{posts.map((post) => (
				<PostItem key={post?.id} userId={userId ?? ""} data={post} />

			))}
		</>
	)
}

export default PostFeed;

