import axios from 'axios';
import DataUpdate from "../utils/DataUpdate";

export default function TaksDelete(setColumns:Function,listID:string,taskID:number){
  axios.delete("/api/TaskDelete",{data:{
      _id: listID,
      items_id: taskID,
    }}).then(()=>{
      DataUpdate(setColumns)
    })
};