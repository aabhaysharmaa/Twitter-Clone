"use client";

import EditModal from "./EditModal";
import LoginModal from "./LoginModel";
import RegisterModal from "./RegisterModel";

export default function ModalProvider() {
  return (
    <>
      <EditModal />
      <LoginModal />
      <RegisterModal />
    </>
  );
}
