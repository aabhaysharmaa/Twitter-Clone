import EditModal from "./EditModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const ModalProvider = () => {
  return (
<>
 <LoginModal/>
 <RegisterModal/>
 <EditModal/>
</>
  )
}

export default ModalProvider;