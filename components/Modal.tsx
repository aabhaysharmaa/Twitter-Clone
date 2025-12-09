"use client";

import React, { ReactElement, useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  disabled?: boolean;
  title?: string
  actionLabel?: string
  isLoading?: boolean
}

const Modal = ({
  isOpen,
  onSubmit,
  onClose,
  body,
  footer,
  disabled,
  title,
  actionLabel,
  isLoading
}: ModalProps) => {
  const handleClose = useCallback(() => {
    if (disabled || !onClose) return;
    onClose();
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) return
    onSubmit()
  }, [disabled, onSubmit])


  if (!isOpen) return;

  return (
    <div
      className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-neutral-800/70 focus:outline-none'
    >
      <div className="relative w-full lg:w-3/6 max-auto lg:max-w-3xl h-full lg:h-auto">
        {/* Content */}
        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none  focus:outline-none">
          {/* header */}
          <div className="flex items-center justify-between rounded-t p-10">
            <h3 className='text-3xl font-semibold'>{title}</h3>
            <button className='hover:opacity-70 cursor-pointer'>
              <AiOutlineClose onClick={handleClose} />
            </button>
          </div>
          {/* BODY */}
          <div className="p-10 flex-col flex relative">
            {body}
          </div>
          {/* Footer */}
          <div className="flex flex-col gap-2 p-10">
            <Button label={actionLabel} fullWidth isLoading={isLoading} secondary disabled={disabled} large onClick={handleSubmit} />
          </div>
          {footer}
        </div>
      </div>
    </div>
  )
}

export default Modal