import "../../css/ListProduceItem.css";
import { useState } from "react";
import ListOnClick from '../../apis/ListOnClick';
import ListOnKeyPress from '../../utils/ListOnKeyPress';
import {ListStateType} from '../../common/TypeBox'
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function ListProduceItem(props :ListStateType): JSX.Element {

  const 꺼내온거 = useSelector((state: RootState) => state);
  const [list,setList] = useState<string>();
  const setColumn =  props.setColumns;
  
  return (
    <div className="ListInput">
        <input onKeyPress={(e)=>{ListOnKeyPress(e,ListOnClick,list,setColumn,꺼내온거.userInformation.userID)}} type="text" placeholder="+ Add another list..." onChange={(e)=>{ setList(e.target.value)}}/>
    </div>
  );

};

