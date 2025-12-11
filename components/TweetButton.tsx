
import { useRouter } from 'next/navigation'

import { FaFeather } from 'react-icons/fa'

const TweetButton = () => {
	const router = useRouter();

	return (
		<div>
			<div onClick={() => router.push("/")} className=" w-[200px] cursor-pointer hidden lg:flex justify-center items-center p-2 bg-sky-500 hover:bg-sky-300 rounded-full">
				<p className='text-lg font-bold'>Tweet</p>
			</div>
			<div onClick={() => router.push("/")} className="bg-sky-500 lg:hidden sm:flex hover:bg-sky-300 p-4 rounded-full flex items-center justify-center ">
				<FaFeather />
			</div>
		</div>
	)
}

export default TweetButton