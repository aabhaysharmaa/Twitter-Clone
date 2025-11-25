"use client";
import React, { ReactElement, useCallback } from 'react';
import Button from "./Button";
import { AiOutlineClose } from 'react-icons/ai';
interface ModalProps {
	isOpen?: boolean;
	onSubmit?: () => void;
	onClose: () => void;
	disabled?: boolean
	body?: ReactElement;
	footer?: ReactElement;
	title?: string
	actionLabel: string
}

const Modal = ({
	isOpen,
	onClose,
	onSubmit,
	body,
	footer,
	disabled,
	title,
	actionLabel

}: ModalProps) => {
	const handleClose = useCallback(() => {
		if (disabled) return;
		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled || !onSubmit) return;
		onSubmit();
	}, [onSubmit, disabled])
	if (!isOpen) {
		return null;
	}
	return (
		<div className='justify-center items-center flex  overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 '>
			<div className="relative w-full lg:w-3/6 mx-auto lg:max-w-3xl h-full lg:h-auto">
				{/* content */}
				<div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
					{/* Header */}
					<div className="flex items-center justify-between rounded-t p-10">
						<h3 className='text-3xl font-semibold'> {title}</h3>
						<button className='cursor-pointer ml-auto transition p-1 hover:opacity-70' onClick={handleClose}>
							<AiOutlineClose />
						</button>
					</div>
					{/* BODY */}
					<div className="relative p-10 flex-col ">
						{body}
					</div>
					{/* Footer */}
					<div className="flex flex-col gap-2 p-10">
						<Button label={actionLabel} secondary fullWith disabled={disabled} large onClick={handleSubmit} />
					</div>
					{footer}
				</div>
			</div>
		</div>
	)
}

export default Modal;