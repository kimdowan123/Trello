import axios from 'axios';
import {ListType} from '../common/TypeBox';

export default function DataUpdate(setColumns:Function){
    axios.get('/api/home').then((result) => {
        const box :ListType[]= result.data;
        box.reverse();
        setColumns(box);
      }).catch(() => {
        console.log('renewal fail');
      })
};