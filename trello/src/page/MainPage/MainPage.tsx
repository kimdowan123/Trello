import { useEffect, useState } from "react";
import "../MainPage/MainPage.css";
import HeaderItem from "../../components/main/HeaderItem";
import ListItem from "../../components/main/ListItem";
import FooterItem from "../../components/main/FooterItem";
import AlertItem from '../../components/main/AlertItem';
import SideModalItem from "../../components/main/SideModalItem";
import { ListType } from '../../common/TypeBox';
import GetData from '../../apis/GetData'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

function MainPage(): JSX.Element {
  const stateBox = useSelector((state: RootState) => state);
  //db data 저장
  const [columns,setColumns] = useState<ListType[]>([]);
  
  useEffect(()=>{
    //server에게 db data요청
    GetData(setColumns)
  },[]);            

  //side modal on-off
  const [side,setSide] = useState<string>('');
  const [click,setClick] = useState<number>(0);

  useEffect(()=>{
    if(click %2===0){
      setSide('sideModal-off');
    }else{
      setSide('sideModal-on');
    }
  },[click]);

  return (
    <>
     {
       stateBox.login.login === true ?
      
       <div className="Home">
     
          {/* Header */}
          <HeaderItem setClick={setClick} setColumns={setColumns}/>

          {/* side Modal */}
          <SideModalItem  side={side} setSide={setSide}></SideModalItem>
          
          {/* Paging  and drag drop */}
          <ListItem columns={columns} setColumns={setColumns}/>
          
          {/* Footer */}
          <FooterItem />
      
       </div> : <AlertItem/>
    }
   </>
  );
}

export default MainPage;
