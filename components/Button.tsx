interface ButtonProps {
	label: string,
	secondary?: boolean,
	fullWith?: boolean,
	outline?: boolean,
	disabled?: boolean,
	large?: boolean,
	onClick: () => void
}
const Button = ({ label, secondary, fullWith, outline, disabled, large, onClick }: ButtonProps) => {

	return (
		<button disabled={disabled} onClick={onClick} className={`disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer outline-none border-0 font-semibold rounded-full transition hover:opacity-80 ${fullWith ? "w-full" : "w-fit"} ${secondary ? "bg-white" : "bg-sky-500"} ${secondary ? "border-black" : "border-sky-500"}  ${secondary ? "text-black" : "text-white"}  ${large ? "text-xl" : "text-md"} ${large ? "px-5" : "px-4"} ${large ? "py-3" : "py-2"} ${outline ?"bg-transparent" : ""} ${outline ? "border-white" :""} ${outline ? "text-white" : ""}`
		}>{label}</button>
	)
}

export default Button
