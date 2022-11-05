export default function onChangeName(
  e: React.ChangeEvent<HTMLInputElement>,
  setMyName: Function,
  setNameMessage: Function,
  setisMyName: Function
) {
  const currentName = e.target.value;
  setMyName(currentName);
  const regex = /^[ㄱ-ㅎ|가-힣]{2,5}$/;
  if (!regex.test(currentName)) {
    setNameMessage("이름은 2글자 이상 5글자 이하의 한글만입력해주세요!");
    setisMyName(false);
  } else {
    setNameMessage("올바른 양식으로 입력하셧습니다.");
    setisMyName(true);
  }
}
