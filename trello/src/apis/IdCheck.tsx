import axios from "axios";

export default function IdCheck(
  MyId: string,
  setIdMessage: Function,
  setisMyId: Function
) {
  axios.get("/api/userIdCheck").then((result) => {
    const box = result.data;
    const IDarray: string[] = [];
    box.map((result: any, i: number) => IDarray.push(result.id));
    if (IDarray.includes(MyId) === true) {
      setIdMessage("이미 있는 아이디입니다.");
      setisMyId(false);
    } else if (IDarray.includes(MyId) === false) {
      setIdMessage("사용 가능한 아이디입니다.");
      setisMyId(true);
    }
  });
}
