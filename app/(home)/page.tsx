import Header from "@/components/Header"
import LoginModal from "@/components/LoginModel"
import RegisterModal from "@/components/RegisterModel"
const Home = () => {
  return (
    <>
    <LoginModal/>
    <RegisterModal/>
     <Header label="Home"/>
    </>
  )
}

export default Home