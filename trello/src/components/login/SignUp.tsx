import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import IdCheck from '../../apis/IdCheck';
import SignUpFun from '../../apis/SignUpFun';
import {ModalType} from '../../common/TypeBox';
import onChangeId from '../../utils/onChangeId';
import onChangePassword from '../../utils/onChangePassword';
import onChangePasswordConfirm from '../../utils/onChangePasswordConfirm';
import onChangeName from '../../utils/onChangeName';

function SignUp(props: ModalType): JSX.Element{

  let setModal = props.setModal
  
  //회원가입 state 
  const [MyId,setMyId]= useState(''); // 내가 입력한 아이디 저장
  const [MyPw,setMyPw]= useState(''); // 내가 입력한 비밀번호 저장
  const [MyPwConfrim,setMyPwConfrim]= useState(''); // 비밀번호 확인
  const [MyName,setMyName] = useState('')// 내가 입력한 이름
 
  //유효성검사 
  const [isMyId,setisMyId]= useState(false); 
  const [isMyPw,setisMyPw]= useState(false); 
  const [isMyPwConfrim,setisMyPwConfrim]= useState(false); 
  const [isMyName,setisMyName] = useState(false)
 
  // 메세지
  const [IdMessage,setIdMessage]=useState('아이디 입력후 꼭 중복체크 해주세요!')
  const [PwMessage,setPwMessage]=useState('')
  const [PwConfrimMessage,setPwConfrimMessage]=useState('')
  const [NameMessage,setNameMessage]=useState('')


    return(
        
     <div className={props.modal===true ? 'black-modal' : 'black-modal-hidden'}>

            <div className="white-modal">
            
            <FontAwesomeIcon icon={faXmark} className="xmarkIcon" onClick={()=>{setModal(false)}}/>

                <h2>회원가입</h2>
                <br />
                <br />
                <div className="user-message"><p>아이디*</p> <p className={isMyId === false ? 'isNamingFalse' : 'isNaming'}>{IdMessage}</p></div>

                <div className="IdInput">
                <input type="text"  name="아이디"  placeholder="아이디를 입력하세요." onChange={(e)=>{
                  onChangeId(e,setMyId,setIdMessage,setisMyId)
                }} autoComplete="new-password"/>

                {/* 아이디 중복체크 버튼 */}
                <button onClick={()=>{ IdCheck(MyId,setIdMessage,setisMyId )}}>중복체크</button>

                </div>
                
                <div className="user-message"><p>비밀번호*</p>  <p className={isMyPw === false ? 'isNamingFalse' : 'isNaming'}>{PwMessage}</p></div>
                <div className="user-input">
                    <input type="password" name="비번" placeholder="비밀번호를 입력하세요." onChange={(e)=>{
                      onChangePassword(e,setMyPw,setPwMessage,setisMyPw)
                    }} autoComplete="new-password"/>
                </div>
                
                <div className="user-message"><p>비밀번호 재입력*</p> <p className={isMyPwConfrim === false ? 'isNamingFalse' : 'isNaming'}>{PwConfrimMessage}</p></div>
                <div className="user-input">
                    <input type="password" name="비번확인" placeholder="다시한번 비밀번호를 입력하세요." onChange={(e)=>{
                       onChangePasswordConfirm(e,setMyPwConfrim,setPwConfrimMessage,MyPw,setisMyPwConfrim)
                    }}/>
                </div>
            
                <div className="user-message"><p>이름*</p> <p className={isMyName === false ? 'isNamingFalse' : 'isNaming'}>
                    {NameMessage}
                    </p>
                </div>

                <div className="user-input">
                    <input type="text" name="이름" placeholder="이름을 입력해주세요." onChange={(e)=>{
                      onChangeName(e,setMyName,setNameMessage,setisMyName)
                    }}/>
                </div>
                
                {/* 회원가입버튼 */}
                <button 
                onClick={()=>{SignUpFun(MyId,MyPw,MyName)}} 
                disabled={ isMyId === true && isMyPw ===true && isMyPwConfrim ===true && isMyName===true ?false :true}>
                회원가입</button>

            </div> 


      
     </div>
    
    )
} export default SignUp;