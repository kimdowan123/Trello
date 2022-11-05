import axios from 'axios';
import DataUpdate from '../utils/DataUpdate';

export default function ListOnClick(list :string,userID:string,setColumn :Function){
    axios.post('/api/ListAdd',{
        name:list,
        ListProducer:userID
      }).then(()=>{
        DataUpdate(setColumn)
      })
};

