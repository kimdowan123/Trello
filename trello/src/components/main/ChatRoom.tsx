import { useEffect, useState ,useRef} from "react";
import { io } from "socket.io-client";
import $ from "jquery";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function ChatRoom(): JSX.Element {
  const 꺼내온거 = useSelector((state: RootState) => state);

  //실시간채팅시 사용자정보 state
  // const [name,setName]=useState<string>();
  // const [Id,setId] = useState<string>();
  // const [Profile,setProfile]=useState<string>();

//socket.io 연결
// const socket = io("http://localhost:8080/");
const socket = io("https://dowan-portfolio-1.du.r.appspot.com/");

const [comment, setComment] = useState(); // 입장시 모든사람에게 모여줄 텍스트.
let [count,setCount] = useState(0);

useEffect(()=>{
  
    // const userName = localStorage.getItem('userName');
    // setName(userName)
    
    // const userID= localStorage.getItem('userID')
    // setId(userID)
  
    // const userProfile =localStorage.getItem('userProfile')
    // setProfile(userProfile)

  
  // const socket = io("http://localhost:8080/");
  const socket = io("https://dowan-portfolio-1.du.r.appspot.com/");
  socket.on("comment", function (data) {
    setComment(data);
  });

  socket.on("broadcast", function (data) {
    setCount(count++)
    if(data.myName===localStorage.getItem('userName')){
      $('#content').append('<div id="chatroom-text"><p>'+data.myStory+'</p></div>')
    }else{
      $('#content').append('<div id="chatroom-text-2"><span>'+data.myName+'</span><br/><p>'+data.myStory+'</p></div>')
    }
  });

  return ()=>{
    socket.close()
  }
},[])
 

//내가 쓴글
const [text,setText]= useState({})
//socket  data전달
const onClick = () => {
  if(Object.keys(text).length !== 0){
    socket.emit("user-send", text);
  }else{
    alert('텍스트를 입력해주세요')
  }
};

//enter event
const onKeyPress = (e: any) => {
  if (e.key === "Enter") {
    onClick();
    (e.target as HTMLTextAreaElement).value = "";
    setText({})
  }
};


//scroll function
const messageBoxRef = useRef<HTMLInputElement>();
const scrollToBottom = () => {
  if (messageBoxRef.current) {
     messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  }
};
useEffect(() => {
  scrollToBottom();
}, [count]);

  return (
    <>
      <div className="chatroom">

        <br />
        <div ref={messageBoxRef} className="chatroom-show" >
          <br />
          <p className="chatroom-show-text">{comment}</p>
          <div id="content" className="content"></div>
        </div>

        <div className="chatroom-button">
          <input
            type="text"
            onClick={(e)=>{ (e.target as HTMLTextAreaElement).value = "";}}
            onKeyPress={onKeyPress}
            onChange={(e) => {
              setText({
                myStory:e.target.value,
                myId:꺼내온거.userInformation.userID,
                myName:꺼내온거.userInformation.userName,
                myProfile:꺼내온거.userInformation.userProfile
              });
            }}
          />
          <button onClick={onClick}>send</button>
        </div>

      </div>
    </>
  );
}
export default ChatRoom;
