
export default function ListOnKeyPress(e:any,ListOnClick:Function,list:string,setColumn:Function,userID:string){
    if (e.key === "Enter") {
      ListOnClick(list,userID,setColumn);
        (e.target as HTMLTextAreaElement).value = "";
      }
}