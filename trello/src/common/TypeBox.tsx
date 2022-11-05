export type ModalType = {
  modal?: boolean;
  setModal?: Function;
};

export type SideType = {
  side?:string;
  setSide?: Function;
};

export type ListStateType = {
  columns?:ListType[];
  setColumns?:Function;
}

export interface ListType {
  _id?: string;
  name?: string;
  ListProducer?:string,
  items?: TaskType[];
};
interface CommentType {
  Comment:string,
  Producer:string,
  userID:string,
  CommentID:number,
  modal:boolean,
  ProfileUrl:string
}
export interface TaskType {
  id?: string;
  content?: string;
  items_id?:number;
  userID?:string;
  Description?:string;
  userName?:string;
  profile?:string;
  Comment?:CommentType[]
};

export interface ReviseType extends ModalType {
  taskText?: string;
  taskID?: number;
  listID?: string;
  setColumns?:Function;
};




