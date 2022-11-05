import axios from "axios";
import DataUpdate from "../utils/DataUpdate";

export default function ReviseOnClick(
  reviseText: string,
  user: string,
  profile: string,
  listID: string,
  setColumns: Function,
  setModal: Function,
  taskID: number
) {
  axios
    .put("/api/TaskRevise", {
      newTask: reviseText,
      _id: listID,
      items_id: taskID,
      userName: user,
      profile: profile,
    })
    .then(() => {
      DataUpdate(setColumns);
      setModal(false)
    });
};
