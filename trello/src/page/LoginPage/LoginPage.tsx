import "../LoginPage/LoginPage.css"
import { useState } from "react";
import SignUp from '../../components/login/SignUp';
import LoginItem from '../../components/login/LoginItem'
function LoginPage(): JSX.Element {
 
  // sign up modal open/close
  const [modal,setModal] =useState<boolean>(false);

  return (
    <div className="LoginHome"> 
        {/* 회원가입 */}
        <SignUp modal={modal} setModal={setModal}></SignUp>
      
        {/* 로그인 */}
        <LoginItem setModal={setModal}></LoginItem>
    </div>
  );
  
}
export default LoginPage;




