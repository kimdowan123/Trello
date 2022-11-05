import axios from 'axios';

export default function LogOut(){
    axios.post('/api/LogOut',function(){
        console.log('로그아웃')
    })
};