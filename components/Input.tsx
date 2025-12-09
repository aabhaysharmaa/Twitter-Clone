interface InputProps {
	placeholder?: string;
	value?: string;
	type?: string
	disabled?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input = ({ placeholder, value, type, disabled, onChange }: InputProps) => {
	return (
		<input type={type} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange}
			className="p-4 text-lg border-2 border-neutral-800 rounded-md outline-none focus:border-sky-500
			  focus:border-2 transition disabled:bg-neutral-900/70 disabled:cursor-not-allowed
			text-white  "
		/>
	)
}

export default Input