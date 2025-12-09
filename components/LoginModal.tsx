"use client";

import { useCallback, useState } from "react"
import Modal from "./Modal"
import useLoginModal from "@/hooks/useLoginModal";
import Input from "./Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";


const LoginModal = () => {
	const { mutate } = useCurrentUser();
	const loginModal = useLoginModal();


	const registerModal = useRegisterModal();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const onSubmit = useCallback(async () => {

		try {
			setIsLoading(true)
			const res = await signIn("credentials", {
				email, password, redirect: false
			})
			if(res.error) {
			  toast.error("Wrong Credentials")
			  return
			}
			toast.success("Logged In");
			loginModal.onClose() ;
			mutate();
		} catch (error) {
			console.log("Error in Login Modal : ", (error as Error).message)
		} finally {
			setIsLoading(false)
		}
	}, [email, password, loginModal, mutate])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input placeholder="Email" value={email} disabled={isLoading} type="email" onChange={(e) => setEmail(e.target.value)} />
			<Input placeholder="Password" value={password} disabled={isLoading} type="password" onChange={(e) => setPassword(e.target.value)} />
		</div>
	)

	const toggleModal = useCallback(() => {
		if (isLoading) return;
		if (!registerModal.isOpen) {
			registerModal.onOpen();
			loginModal.onClose()
		}
	}, [registerModal, loginModal, isLoading])

	const footer = (
		<div className="text-neutral-400 flex items-center justify-center my-6 ">
			<p className="font-semibold">First time using Twitter?</p>
			<span className="hover:underline text-white  cursor-pointer" onClick={toggleModal}>register</span>
		</div>
	)

	return (
		<Modal
			actionLabel="Log In"
			onSubmit={onSubmit}
			title="Login"
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			body={bodyContent}
			footer={footer}
			disabled={isLoading}
			isLoading={isLoading}
		/>
	)


}

export default LoginModal