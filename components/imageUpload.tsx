"use client";


import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


interface imageUploadProps {
	value?: string;
	disabled?: boolean;
	onChange: (image: string) => void;
	label?: string;
}

const ImageUpload = ({ value, disabled, onChange, label }: imageUploadProps) => {
	const [base64, setBase64] = useState<string | undefined>(value);


	const handleChange = useCallback(
		(base64: string) => {
			onChange(base64);
		}, [onChange])


	const handleDrop = useCallback(
		(files: File[]) => {
			const file = files[0];
			const reader = new FileReader();
			reader.onload = (event: ProgressEvent<FileReader>) => {
				const result = event.target?.result;
				if (typeof result === "string") {
					setBase64(result);
					handleChange(result);
				}
			}
			reader.readAsDataURL(file);
		}, [handleChange])


	const { getInputProps, getRootProps } = useDropzone({
		maxFiles: 1,
		onDrop: handleDrop,
		disabled,
		accept: {
			"image/jpeg": [],
			"image/png": []
		}
	})

	return (
		<div
			{...getRootProps({
				className: "w-full p-4 text-white border-2 border-dotted rounded-md  border-neutral-500 cursor-pointer"
			})}
		>
			<input {...getInputProps()} />
			{
				base64 ? (

					<div key={base64} className="flex items-center justify-center">
						<Image src={base64} height={100} width={100} alt="Upload Image" className="object-cover rounded-md" />
					</div>
				) : (
					<p className="text-center text-neutral-300">{label}</p>
				)
			}
		</div >
	)
}

export default ImageUpload