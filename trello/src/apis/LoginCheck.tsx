import axios from "axios";
import { loginSuccess, loginFail } from "../features/login";
import { setUserInformation } from "../features/userInformation";

interface userInformationType {
  name: string;
  id: string;
  ProfileUrl: string;
};

export default function LoginCheck(
  Id: string,
  Pw: string,
  navigate: Function,
  dispatch: Function
) {
  if (Id !== "" && Pw !== "") {
    axios.post("/api/login", { id: Id, pw: Pw }).then((result) => {
      if (result.data.BooleanBox === true) {
        //로그인 성공시 상태저장
        dispatch(loginSuccess());
        //로그인성공시 user 정보 저장
        const userInformation: userInformationType = {
          name: result.data.userBox.name,
          id: result.data.userBox.id,
          ProfileUrl: result.data.userBox.ProfileUrl,
        };
        dispatch(setUserInformation(userInformation));
        navigate("/home");
      } else {
        dispatch(loginFail());
        alert(result.data.info.message);
      }
    });
  } else if (Id === "") {
    alert("아이디를 입력해주세요.");
  } else if (Pw === "") {
    alert("비밀번호를 입력해주세요.");
  }
}
