export default function onChangePassword(
  e: React.ChangeEvent<HTMLInputElement>,
  setMyPw: Function,
  setPwMessage: Function,
  setisMyPw: Function
) {
  const currentPassword = e.target.value;
  setMyPw(currentPassword);
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegExp.test(currentPassword)) {
    setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력!");
    setisMyPw(false);
  } else {
    setPwMessage("안전한 비밀번호 입니다.");
    setisMyPw(true);
  }
}
