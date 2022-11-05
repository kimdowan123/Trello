import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilePen ,faRightFromBracket ,faBars } from "@fortawesome/free-solid-svg-icons";
import "../../css/HeaderItem.css";
import ListProduceItem from "./ListProduceItem"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";

import axios from "axios";

type HeaderType = {
  setClick?:Function,
  setColumns?:Function
}

function HeaderItem(props :HeaderType): JSX.Element {
  
  const navigate = useNavigate();
  const stateBox = useSelector((state: RootState) => state);

  let [count,setCount] = useState(0);
  
  return (
    <>
      <header>
        <div className="header-first">
          {/* 사이드 메뉴바 */}
         <FontAwesomeIcon icon={faBars} className="hamburger"  onClick={()=>{
            setCount(count=count+1)
            props.setClick(count)
          }}/>

          {/* 리스트생성  */}
          <ListProduceItem setColumns={props.setColumns}></ListProduceItem>
        </div>

        <div>
            <span className="Logo" onClick={()=>{
                 window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}>
              <FontAwesomeIcon icon={faFilePen}/> Trello
            </span>
        </div>

        <div>
            <div className="SignOut">
              <img src={stateBox.userInformation.userProfile} alt="profileImage"/><p className="userName">{stateBox.userInformation.userName}</p>
              <span
                className="SignOutLogo"
                onClick={() => {
                  //cookie 삭제
                  axios.post('/api/LogOut',function(){
                    console.log('로그아웃')
                  })
                  //로그아웃 localStorage 삭제
                  window.localStorage.clear();
                  navigate("/");
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
              </span>
            </div>
        </div>
       

        
      </header>
    </>
  );
}
export default HeaderItem;
