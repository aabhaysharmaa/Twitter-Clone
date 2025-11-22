"use client";

import { useCallback, useState } from "react";
import LoginModalStore from "../hooks/useloginModal"
import Input from "../components/Input"
import Modal from "./Modal";
import RegisterModalStore from "@/hooks/useRegisterModal";



const RegisterModal = () => {
  const loginModal = LoginModalStore();
  const registerModal = RegisterModalStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      // Sign in logic
      registerModal.onClose();
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
      <Input type="name" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
      <Input type="username" placeholder="username" onChange={(e) => setUserName(e.target.value)} value={username} disabled={isLoading} />
    </div>
  )

  const toggleModel = useCallback(() => {
    if (isLoading) return null;
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal, isLoading])

  const footerContent = (
    <div className="text-neutral-400 flex  justify-center items-center text-center ml-2 my-6">
      <p >Already have an account?</p><span className="text-white cursor-pointer hover:underline" onClick={toggleModel}>Log In</span>
    </div>
  )

  return (
    <Modal disabled={isLoading} title="Create an Account" actionLabel="Sign In" isOpen={registerModal.isOpen} body={bodyContent} onClose={registerModal.onClose} onSubmit={onSubmit} footer={footerContent} />
  )
}

export default RegisterModal;