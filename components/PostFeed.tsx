"use client";
import PostItem from '@/components/PostItem'
import usePosts from '@/hooks/usePosts'
interface PostFeedProps {
	userId?: string
}


const PostFeed = ({ userId }: PostFeedProps) => {
	const { data: posts = [] } = usePosts(userId)
	console.log("Poss Array : ", posts)
	return (
		<>
			{posts.map((post) => (
				<PostItem key={post.id} userId={userId as string} data={post} />
			))}
		</>
	)
}

export default PostFeed