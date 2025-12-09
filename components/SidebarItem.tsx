"use client";
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast";
import { IconType } from "react-icons";
interface SideBarItemProps {
	href?: string
	icon: IconType,
	label: string
	onClick?: () => void
}

const SideBarItem = ({ href, icon: Icon, label, onClick }: SideBarItemProps) => {
	const router = useRouter();
	const pathName = usePathname()
	const handelClick = () => {
		if (onClick) {
			onClick()
			toast.success("logOut")
			return
		}
		else {
			router.push(href!)
		}
	}
	return (
		<div className="flex flex-col items-start" onClick={handelClick}>
			<div className={`justify-center cursor-pointer  h-full items-center gap-4 hidden lg:flex rounded-full hover:bg-slate-200/10 p-4 ${pathName === href && "bg-slate-300/20"}`}>
				<Icon size={24} />
				<p className="text-xl font-[30px] hidden lg:flex" >{label}</p>
			</div>
			{/* Mobile sidebar */}
			<div className="flex size-14 h-full justify-center sm:flex lg:hidden items-center gap-4  rounded-full hover:bg-slate-300/10 p-4 cursor-pointer">
				<Icon size={22} />
			</div>
		</div>
	)
}

export default SideBarItem