"use client";

import { useCallback, useState } from "react";
import LoginModalStore from "../hooks/useloginModal"
import Input from "../components/Input"
import Modal from "./Modal";
import RegisterModal from "./RegisterModel";
import RegisterModalStore from "@/hooks/useRegisterModal";



const LoginModal = () => {
	const loginModal = LoginModalStore();
	const registerModal = RegisterModalStore();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true)
			// Sign in logic
			loginModal.onClose();
		} catch (error) {
			console.log(error.message)
		} finally {
			setIsLoading(false)
		}
	}, [loginModal])
	const toggleModel = useCallback(() => {
		if (isLoading) return null;
		loginModal.onClose();
		registerModal.onOpen();
	}, [registerModal, loginModal, isLoading])
	const bodyContent = (
		<div className="flex flex-col gap-4 ">
			<Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
			<Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
		</div>
	)
	const footerContent = (
		<div className="text-neutral-400 flex  justify-center items-center text-center my-6">
			<p className="font-semibold ">First time using Twitter?</p><span className="text-white cursor-pointer hover:underline" onClick={toggleModel}>register</span>
		</div>
	)
	return (
		<Modal disabled={isLoading} title="Login" footer={footerContent} actionLabel="Sign In" isOpen={loginModal.isOpen} body={bodyContent} onClose={loginModal.onClose} onSubmit={onSubmit} />
	)
}

export default LoginModal;