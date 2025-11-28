/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'


interface CommentItemProps {
	data?: Record<string, any>
}


const CommentItem = ({ data }: CommentItemProps) => {
	const router = useRouter();

	const goToUser = useCallback((event: any) => {
		event.stopPropagation();
		router.push(`/api/users/${data?.user.id}`)
	}, [router, data?.user.id])


	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}
		return formatDistanceToNowStrict(new Date(data?.createdAt))
	}, [data?.createdAt])
	return (
		<div className="border-b- border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">

		</div>
	)
}

export default CommentItem