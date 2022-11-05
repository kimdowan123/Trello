import { useNavigate } from "react-router-dom";
import '../../css/AlertItem.css'

function AlertItem() : JSX.Element{

  const navigate = useNavigate();
  
  return (
    <div className="alert">
      <div style={{height:"1px"}}></div>
      <div className="alert-box">
        <div>로그인 해주세요:D</div>
        <div className="alert-btn" onClick={() => {
            navigate('/')
        }}>로그인하러가기</div>
      </div>
    </div>  
  );
}export default AlertItem;
