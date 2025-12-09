import clsx from "clsx";


 import {LoaderCircle} from "lucide-react"

interface ButtonProps {
	label?: string;
	secondary?: boolean;
	fullWidth?: boolean;
	outline?: boolean;
	disabled?: boolean;
	large?: boolean;
	isLoading?: boolean
	onClick: () => void
}



const Button = ({ label, secondary, fullWidth, outline, disabled, large, isLoading, onClick }: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={clsx(`cursor-pointer outline-none border-0 font-semibold rounded-full transition hover:opacity-80 `, disabled && "opacity-70 cursor-not-allowed", fullWidth ? "w-full" : "w-fit", outline ? "border-white text-white" : secondary ? "bg-white text-black" : "bg-sky-500 border-white text-white", large ? "text-xl px-5 py-3" : "text-md px-4 py-2")}
		>
			{isLoading ? <LoaderCircle  className="animate-spin mx-auto text-black " /> :label}
		</button>
	)
}

export default Button