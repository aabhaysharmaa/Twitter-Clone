import clsx from "clsx";

interface ButtonProps {
	label: string,
	secondary?: boolean,
	fullWith?: boolean,
	outline?: boolean,
	disabled?: boolean,
	large?: boolean,
	isLoading?: false
	onClick: () => void
}
const Button = ({ label, secondary, fullWith, outline, disabled, large, onClick, isLoading }: ButtonProps) => {

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				"cursor-pointer outline-none border-0 font-semibold rounded-full transition hover:opacity-80",
				disabled && "opacity-70 cursor-not-allowed",
				fullWith ? "w-full" : "w-fit",
				// Handle secondary and outline together
				outline
					? "border-white text-white"
					: secondary
						? "bg-white  text-black"
						: "bg-sky-500 border-white text-white",
				large ? "text-xl px-5 py-3" : "text-md px-4 py-2"
			)}
		>
			{isLoading ? "Saving..." : label}
		</button>

	)
}

export default Button
