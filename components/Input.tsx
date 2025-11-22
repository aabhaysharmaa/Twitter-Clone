import React from "react";


interface InputProps {
	placeholder?: string;
	value?: string;
	type?: string;
	disabled?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, type, disabled, onChange }: InputProps) => {
	return (
		<input type={type} disabled={disabled}
			placeholder={placeholder} onChange={onChange} value={value} className="w-full p-4 text-lg border-2 border-neutral-800
			rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900/70 disabled:cursor-not-allowed"
		/>
	)
}

export default Input