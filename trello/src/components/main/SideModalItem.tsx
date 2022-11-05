import React, { useEffect, useState , useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCameraRetro} from "@fortawesome/free-solid-svg-icons";
import '../../css/SideModalItem.css'
import {SideType} from '../../common/TypeBox';
import ChatRoom from "./ChatRoom"
import ClockItem from "./ClockItem"
import {  useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { setUserInformation } from "../../features/userInformation";

function SideModalItem(props :SideType): JSX.Element{
  const stateBox = useSelector((state: RootState) => state); 
  const [name,setName] = useState<string>();
  const [userID,setUserID]=useState<string>();
  const [Profile,SetProfile] = useState<any>();
  const [fileName,setFileName] = useState<any>('');
  const dispatch = useDispatch();
 
  //프로필  설정  이미지 
  const fileInput = useRef(null)
  const [file,setFile]=useState<any>();

  useEffect(()=>{
    SetProfile(stateBox.userInformation.userProfile)
    
    setName(stateBox.userInformation.userName)
  
    setUserID(stateBox.userInformation.userID)
    
  },[fileName]);


  function onChange(e :React.ChangeEvent<HTMLInputElement>) {
    
	if(e.target.files[0]){
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
            const box = 'https://dowan-portfolio-1.du.r.appspot.com/assets/'+e.target.files[0].name
            
            const userInformation = {
                name: stateBox.userInformation.userName,
                id: stateBox.userInformation.userID,
                ProfileUrl: box,
              };
            dispatch(setUserInformation(userInformation));
        }else{ //업로드 취소할 시
            SetProfile(Profile)
            return
        }
	//화면에 프로필 사진 표시
    const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                SetProfile(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    //
    const [firstModal,setFirstModal] = useState<boolean>(false);
    let [firstModalCount,setFirstModalCount] = useState(0);

    const [secondModal,setSecondModal] = useState(false);
    let [secondModalCount,setSecondModalCount] = useState(0);
   
    return(
        <div className={props.side}>
            
            <div className="sideProfile" onClick={()=>{
                setFirstModalCount(firstModalCount=firstModalCount+1)
                if(firstModalCount%2===0){
                    setFirstModal(false)
                }else{
                    setFirstModal(true)
                };
            }}>
                내 소개 사진변경
            </div>

            {
                firstModal === true && 
                <div className="sideModal-box">
                    <form action="/api/upload"  method="POST" encType='multipart/form-data'>
                    <img src={Profile} alt="Profile"  style={{height:"130px", width:'130px',borderRadius:"100px",cursor:"pointer",border:"1px solid gray"}}  onClick={()=>{
                            fileInput.current.click()
                    }}/>
                    <br />
                   
                      <span style={{display:'flex', flexDirection:'column', marginTop:"-10px"}}>
                        <input style={{display:"none",width:"75px",margin:"0 auto"}} id="ex_filename" className="sideModal-camera" type='file' accept='image/jpg,impge/png,image/jpeg'  name='Profile' onChange={onChange} ref={fileInput} />
                        <label htmlFor="ex_filename" style={{cursor:"pointer"}}><FontAwesomeIcon icon={faCameraRetro} style={{color:'white',marginLeft:'60px',position:"relative",top:"-20px"}}/></label>
                        <input type="text" name="userProfile" defaultValue={fileName} style={{display:'none'}}/>
                        <input type="text" name="UserId" defaultValue={userID} style={{display:'none'}}/>
                        <button style={{width:"130px",margin:"0 auto",padding:"10px",borderRadius:"10px",cursor:"pointer"}} type="submit" onClick={()=>{
                            window.location.reload();
                        }}>등록하기</button>
                      </span>
                   </form>  
                </div> 
            }

            <div className="sideProfile" onClick={()=>{
                setSecondModalCount(secondModalCount=secondModalCount+1)
                if(secondModalCount%2===0){
                    setSecondModal(false)
                }else{
                    setSecondModal(true)
                };
            }}>
                실시간채팅
            </div>

            {
                secondModal === true && <div className="sideModal-box"> <ChatRoom></ChatRoom> </div>
            }

            <div style={{textAlign:"center",marginTop:"30px"}}>
                   <p style={{color:"white",fontWeight:"bold",marginBottom:"10px"}}>안녕하세요 😊</p>
                   <p style={{color:"white",fontWeight:"bold",marginBottom:"10px"}}>{name} 님</p>
            </div>

            <br />
            
            <div style={{textAlign:"center"}}>
              <img src={Profile} alt="PhotoProfile" style={{width:"90px" , height:"90px", borderRadius:"100px" ,border:"1px solid gray"}}/> 
            </div>
            <br />
            <div className="clock" style={{textAlign:"center"}}>
                <h2 style={{color:"white",padding:"10px"}}>현재시간</h2>
                <ClockItem></ClockItem>
            </div> 
                   

        </div>
    )
}

export default SideModalItem;