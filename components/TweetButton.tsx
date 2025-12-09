import useLoginModal from '@/hooks/useLoginModal'
import React from 'react'
import { FaFeather } from 'react-icons/fa'

const TweetButton = () => {
	const loginModal = useLoginModal();
	return (
		<div>
			<div onClick={() => loginModal.onOpen()} className=" w-[200px] cursor-pointer hidden lg:flex justify-center items-center p-2 bg-sky-500 hover:bg-sky-300 rounded-full">
				<p className='text-lg font-bold'>Tweet</p>
			</div>
			<div onClick={() => loginModal.onOpen()} className="bg-sky-500 lg:hidden sm:flex hover:bg-sky-300 p-4 rounded-full flex items-center justify-center ">
				<FaFeather />
			</div>
		</div>
	)
}

export default TweetButton