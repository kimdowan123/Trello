import axios from 'axios';
// 회원가입 axios
export default function SignFun(MyId :string,MyPw :string,MyName :string){
    axios.post('/api/SignUp',{
        아이디:MyId,
        비번:MyPw,
        이름:MyName,
        }).then(()=>{
        alert('회원가입 성공')
        window.location.reload();
        });
};