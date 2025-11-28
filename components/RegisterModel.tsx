"use client";
import { useCallback, useState } from "react";
import LoginModalStore from "../hooks/useloginModal"
import axios from "axios";
import Input from "../components/Input"
import Modal from "./Modal";
import RegisterModalStore from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const RegisterModal = () => {
  const loginModal = LoginModalStore();
  const registerModal = RegisterModalStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useCurrentUser();
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.post("/api/register", {
        username,
        name,
        email,
        password
      })
      await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      toast.success("Registered successful");
      mutate()
      registerModal.onClose();
    } catch (error) {
      console.log((error as Error).message)
      toast.error("Something went Wrong!")
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, password, username, name, mutate]);

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

