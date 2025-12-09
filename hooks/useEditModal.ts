"use client"

import { create } from "zustand";


interface useEditModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;

}

const useEditModal = create<useEditModal>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))
export default useEditModal;