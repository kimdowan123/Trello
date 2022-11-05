import {useEffect,useState} from "react";

function ClockItem() {

    const [time,setTime]=useState(new Date());

    useEffect(()=>{
      const id=setInterval(()=>{
        setTime(new Date());
      },1000);
      return ()=>clearInterval(id);
    },[])

    return(
            <h1 style={{color:"white",padding:"10px"}}>{time.toLocaleTimeString('en-US')}</h1>
    )
}
export default ClockItem;