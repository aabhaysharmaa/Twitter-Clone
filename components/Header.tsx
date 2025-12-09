"use client";

import { useRouter } from "next/navigation"
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";



interface HeaderProps {
	label: string;
	showBackArrow: boolean
}

const Header = ({ label, showBackArrow }: HeaderProps) => {
	const router = useRouter();

	const onCLick = useCallback(() => {
		router.back()
	}, [router])

	return (
		<div className="border-b p-5 border-neutral-800">
			<div className="flex flex-row items-center gap-2">
				{showBackArrow && (
					<BiArrowBack size={20} onClick={onCLick} className="cursor-pointer hover:opacity-75 transition" />
				)}
				<h1 className="font-semibold text-xl">{label}</h1>
			</div>

		</div>
	)
}

export default Header