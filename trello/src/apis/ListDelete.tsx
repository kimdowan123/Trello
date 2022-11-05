import axios from "axios";
import DataUpdate from "../utils/DataUpdate";

export default function ListDelete(setColumns: Function, MYcolumnID: any) {
  axios.delete("/api/ListDelete", { data: { _id: MYcolumnID } }).then(() => {
    DataUpdate(setColumns);
  });
};
