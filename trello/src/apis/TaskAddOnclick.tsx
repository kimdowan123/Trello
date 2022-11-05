import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DataUpdate from "../utils/DataUpdate";

//task add
export default function TaskAddOnClick(
  mytext: string,
  userName: string,
  ProfileUrl: string,
  MYcolumnID: string,
  setColumns: Function,
  유저아이디:string
) {
  axios
    .post("/api/addText?_method=PUT", {
     content:mytext,
        userName:userName,
        profile:ProfileUrl,
        _id: MYcolumnID,
        userID:유저아이디,
        unique:uuidv4()
    })
    .then(() => {
      DataUpdate(setColumns);
    });
}
