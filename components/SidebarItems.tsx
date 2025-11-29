import useCurrentUser from '@/hooks/useCurrentUser';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IconType } from 'react-icons';

import LoginModalStore from '@/hooks/useloginModal';

import { BsDot } from 'react-icons/bs';

interface SidebarItemsProps {
	icon: IconType,
	href: string,
	label: string,
	onClick?: () => void,
	auth?: boolean,
	alert?: boolean,
}



const SidebarItems = ({ icon: Icon, href, label, onClick, auth, alert }: SidebarItemsProps) => {
	const router = useRouter();
	const params = usePathname();
	const { data: currentUser } = useCurrentUser();
	const loginModal = LoginModalStore();
	const handleClick = () => {
		if (onClick) {
			onClick();
			toast.success("logged Out")
			return;
		}
		if (auth && !currentUser) {
			loginModal.onOpen();
		}
		else {
			router.push(href);
		}
	}


	return (
		<div className='flex flex-col lg:items-start  justify-center' onClick={handleClick}>
			<div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300/10 cursor-pointer lg:hidden">
				<Icon size={28} />
				{alert ? <BsDot className='absolute text-sky-500 left-0 -top-4' size={70} /> : null}
			</div>

			<div className={` hidden lg:flex p-4  relative justify-center  items-center rounded-full hover:bg-slate-300/20  cursor-pointer h-full  gap-4 ${params === href && "bg-neutral-800"}`}>
				<Icon size={24} />
				{alert ? <BsDot className='absolute text-sky-500 left-0 -top-4' size={70} /> : null}
				<p className='hidden lg:block text-white text-xl'>{label}</p>
			</div>
		</div>
	)
}

export default SidebarItems;
