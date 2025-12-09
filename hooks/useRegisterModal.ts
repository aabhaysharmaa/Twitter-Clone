import { create } from "zustand";


interface useRegisterModal {
	isOpen: boolean,
	onClose: () => void,
	onOpen: () => void
}

const useRegisterModal = create<useRegisterModal>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))



export default useRegisterModal
