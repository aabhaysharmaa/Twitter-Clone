import { create } from "zustand";


interface useLoginModalProps {
	isOpen: boolean,
	onClose: () => void,
	onOpen: () => void
}

const useLoginModal = create<useLoginModalProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))



export default useLoginModal;
