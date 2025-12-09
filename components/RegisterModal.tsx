"use client";


import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import axios from "axios";
import useRegisterModal from '@/hooks/useRegisterModal'
import Input from './Input';
import useLoginModal from '@/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const RegisterModal = () => {
  const { mutate } = useCurrentUser();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.post("/api/register", {
        name,
        email,
        username,
        password
      })
      await signIn("credentials", {
        email, password, redirect: false
      })
      toast.success("Register SuccessFul")
      registerModal.onClose();
      mutate();

    } catch (error) {
      console.log("Error in Register Modal : ", (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, name, password, username, mutate])

  const bodyContent = (
    <div className="flex flex-col  gap-4">
      <Input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
      <Input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
  )

  const toggleModal = () => {
    if (!loginModal.isOpen) {
      loginModal.onOpen();
      registerModal.onClose();
    }
  }

  const footerContent = (
    <div className="text-neutral-400 flex items-center justify-center my-6">
      <p className='font-semibold'>Already have an Account?</p>
      <span className='hover:underline text-white cursor-pointer' onClick={toggleModal} >Log In</span>
    </div>
  )

  return (
    <Modal title='Register' disabled={isLoading} body={bodyContent} onClose={registerModal.onClose} isOpen={registerModal.isOpen} actionLabel='Register' footer={footerContent} isLoading={isLoading} onSubmit={handleSubmit} />
  )
}

export default RegisterModal