export default function onChangeId(
  e: React.ChangeEvent<HTMLInputElement>,
  setMyId: any,
  setIdMessage: Function,
  setisMyId: Function
) {
  const currentId = e.target.value;
  setMyId(currentId);
  const idRegExp = /^[a-zA-z0-9]{4,12}$/;
  if (!idRegExp.test(currentId)) {
    setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
    setisMyId(false);
  } else {
    setIdMessage("올바른 양식의 아이디 입니다.(중복체크 누르셧나요?)");
  }
}
