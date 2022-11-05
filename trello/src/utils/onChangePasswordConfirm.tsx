export default function onChangePasswordConfirm(
  e: React.ChangeEvent<HTMLInputElement>,
  setMyPwConfrim: Function,
  setPwConfrimMessage: Function,
  MyPw: string,
  setisMyPwConfrim: Function
) {
  const currentPasswordConfirm = e.target.value;
  setMyPwConfrim(currentPasswordConfirm);
  if (MyPw !== currentPasswordConfirm) {
    setPwConfrimMessage("비밀번호가 똑같지 않습니다.");
    setisMyPwConfrim(false);
  } else {
    setPwConfrimMessage("똑같은 비밀번호를 입력했습니다.");
    setisMyPwConfrim(true);
  }
}
