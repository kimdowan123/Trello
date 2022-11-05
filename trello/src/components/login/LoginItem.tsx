import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginCheck from "../../apis/LoginCheck";
import {ModalType} from '../../common/TypeBox';


function LoginItem(props: ModalType): JSX.Element{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //로그인시 서버에 보낼  id,pw state
  const [Id,setId]= useState<string>(''); 
  const [Pw,setPw]= useState<string>(''); 
  
    return(
        <>
       
        <div className="hightBox"></div> 
        
        <div className="AllBox">

            <div className="LoginBox-Trello">
              <p><FontAwesomeIcon icon={faFilePen} />Trello</p>
            </div>

            <div className="LoginBox">
              <h1>로그인</h1>
                <br />
                &emsp;아이디<label><input type="text" value={Id} onInput={(e)=>{
                  setId( (e.target as HTMLTextAreaElement).value)
                }}/></label>
                
                &emsp;비밀번호<label><input type="password" value={Pw}  onInput={(e)=>{
                  setPw( (e.target as HTMLTextAreaElement).value)
                }}/></label>
              
              {/* 로그인버튼 */}
              <button onClick={()=>{
                LoginCheck(Id,Pw,navigate,dispatch);
              }}>Login</button>

              <p>아직 회원이 아니신가요?</p>
              <p className="LoginBox-text" onClick={()=>{
                    props.setModal(true);   
              }}>회원가입</p>
            </div>
        </div>
        </>
    )
} export default LoginItem;