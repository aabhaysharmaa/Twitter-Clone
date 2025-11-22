import { create } from "zustand";

interface LoginModalStoreProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const LoginModalStore = create<LoginModalStoreProps>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true })

}));


export default LoginModalStore;