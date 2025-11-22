import { create } from "zustand";

interface RegisterModalStoreProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const RegisterModalStore = create<RegisterModalStoreProps>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () =>  set({ isOpen: true })

}));


export default RegisterModalStore;