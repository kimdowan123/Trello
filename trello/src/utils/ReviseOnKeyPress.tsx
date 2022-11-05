
export default function ReviseOnKeyPress(e:any,ReviseOnClick:Function,reviseText :string,user :string,profile :string,listID:string,setColumns:Function,setModal:Function,taskID:number){
    //enter event
    if (e.key === "Enter") {
      ReviseOnClick(reviseText,user,profile,listID,setColumns,setModal,taskID);
      (e.target as HTMLTextAreaElement).value = "";
    }
  
};