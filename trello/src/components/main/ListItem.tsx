import "../../css/ListItem.css";
import {  useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark,faMagnifyingGlass,faFilePen,faTrashCan,faMessage,faBarsStaggered} from "@fortawesome/free-solid-svg-icons";
import {ListStateType,TaskType} from "../../common/TypeBox";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactPaginate from "react-paginate";
import onDragEnd from "../../utils/DragFuc";
import ListDelete from "../../apis/ListDelete";
import TaksDelete from '../../apis/TaskDelete';
import TaskAddOnClick from '../../apis/TaskAddOnclick';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type select = {
  selected: number;
}

export default function ListItem(props :ListStateType): JSX.Element {
  const stateBox = useSelector((state: RootState) => state);
  const setColumns = props.setColumns
  //pagination
  const data = Object.entries(props.columns);
  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const itemsPerPage: number = 4;


  const [listID, setListID] = useState<string>();
  const [taskID, setTaskID] = useState<number>();
  // task 수정 text
  const [mytext,setmyText]=useState<string>('');
  // task modal state
  const [TaskModal,setTaskModal] =useState(false);
  //task state
  const [TaskData,setTaskData]=useState<TaskType>()


  var [EditComment,setEditComment]=useState<string>('')
  var [Description,setDescription] = useState<any>('')
  var [Comment,setComment]=useState<any>('')
  var [placeholder,setPlaceholder] = useState('Write a Description...')

  useEffect(()=>{
    const endOffset: number = itemOffset + itemsPerPage;
      if(data.length !== 0){
        setCurrentItems(data.slice(itemOffset, endOffset));
      }
      setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset,itemsPerPage,data]);
  
  const handlePageClick = (event:select) => {
    //현재 내가누른 페이지버튼 number
    console.log(event.selected+1);
    
    const newOffset :number= (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  
  
  // textarea scroll event 
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "30px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
 
  return (
    <>
{
        TaskData !== undefined ? <div className={ TaskModal === true ? 'blackBG-on' : 'blackBG-off' }>
        <div className="whiteBG-on">
          <div className="task-head-x">
            {
              stateBox.userInformation.userID=== TaskData.userID && <FontAwesomeIcon className='x-icon' icon={faTrashCan} onClick={() => {TaksDelete(setColumns,listID,taskID); setTaskModal(false);}}/> 
            }
             <FontAwesomeIcon className="x-icon" icon={faXmark} onClick={()=>{setTaskModal(false)}}/>
          </div>
          
         
          <div className="task-head">
            <FontAwesomeIcon icon={faFilePen} className="task-head-icon" />
            <div className="task-head-box">
               <p className="head">{TaskData.content}</p>
               <p className="bottom">Made by {TaskData.userName}</p>
            </div>
          </div>
          
          <br />
          <div className="task-head">
            <FontAwesomeIcon icon={faBarsStaggered} className="task-head-icon"/>
            <p className="head">Description</p> 
          </div>

          {/* 테스크 만든사람일시 textarea 입력창 띄어주어야함 */}
          {
              stateBox.userInformation.userID === TaskData.userID ? 
              <div>
                {/* db에 Description 값이 없으면 textarea */}
                {/* 값이 존재하면 수정버튼/삭제버튼  */}
                {
                  TaskData.Description.length===0 ?
                  <div className="task-description-top">
                    <textarea
                    defaultValue={placeholder}
                    ref={textareaRef}
                    onClick={()=>{setDescription('');}}
                    onChange={(e)=>{textAreaChange(e); setDescription(e.target.value); }}
                    ></textarea>
                    <button style={{display:"block",padding:"5px",margin:'15px'}} onClick={()=>{
                       if(Description.length !== 0){
                        
                          axios.post('/Description',{Description:Description,items_id:TaskData.items_id}).then(()=>{
                            axios.get(`/GetDescription/${TaskData.items_id}`).then((result)=>{
                                setTaskData(result.data)
                            })
                        })
                       }else if(Description===''){
                        alert('내용을 입력해주세요.')
                       }
                    }}>save</button>
                  </div>
                  :<>
                  <div className="task-Description"> 
                    <p>{TaskData.Description}</p>
                  </div> 
                  <div className="task-Description-button">
                      <button 
                        onClick={()=>{
                            setPlaceholder(TaskData.Description)
                            var Task = TaskData;
                            Task.Description='';
                            setTaskData(Task);
                        }}>Edit</button>-
                      <button 
                      
                        onClick={()=>{
                          axios.delete('/Description/Delete',{ data: { items_id: TaskData.items_id}}).then(()=>{
                            axios.get(`/GetDescription/${TaskData.items_id}`).then((result)=>{
                                setTaskData(result.data)  
                          })
                          setDescription('')
                          setPlaceholder('write a Description...')
                          })
                        }}>Delete</button>
                    </div>
                    
                  </>
                }
              </div> 
              : <div className="task-Description">{TaskData.Description}</div>
          }

          <br />
          <br />
          <div className="task-head">
            <FontAwesomeIcon icon={faMessage} className="task-head-icon"/>
            <p className="head">Comment</p>
          </div>

          <div className="task-comment">
            {/* 댓글 input */}
             <img src={stateBox.userInformation.userProfile} alt="ProfileImage"/>
           
              <div className="task-comment-box">
                <textarea placeholder=" write a comment..."  
                ref={textareaRef}
                onChange={(e)=>{textAreaChange(e); setComment(e.target.value); }}
                ></textarea>
                <button style={{display:"block",padding:"5px",margin:'15px'}} onClick={()=>{
                  if(Comment.length !==0){
                    axios.post('/Comment',{
                      Comment:Comment,
                      Producer:stateBox.userInformation.userName,
                      items_id:TaskData.items_id,
                      userID:stateBox.userInformation.userID,
                      ProfileUrl:stateBox.userInformation.userProfile
                    }).then(()=>{
                      axios.get(`/api/GetDetailText/${TaskData.items_id}`).then((result)=>{
                          setTaskData(result.data)
                      })
                    })
                  }else if(Comment === ''){
                    alert("내용을 입력해주세요")
                  }
                  
                }}>save</button>
              </div>
             
          </div>

        
                {
                  TaskData.Comment&&TaskData.Comment.map((item :any,i :number)=>{
                    
                    return(
                      <>
                      <div className="task-comment-bottom">
                        <img src={item.ProfileUrl} alt="testimage" />
                        <div className="task-comment-bottom-text">
                          <h5>{item.Producer}</h5>
                          {
                            item.modal===false ?  <p>{item.Comment}</p> : 
                            <p><input defaultValue={item.Comment} type="text" onChange={(e)=>{setEditComment(e.target.value)}}/><button onClick={()=>{
                               axios.put('/Comment/Edit',{data:{
                                items_id:TaskData.items_id,
                                CommentID:item.CommentID,
                                Comment:EditComment,
                                Producer:item.Producer,
                                userID:item.userID,
                                ProfileUrl:stateBox.userInformation.userProfile
                              }}).then(()=>{
                                axios.get(`/api/GetDetailText/${TaskData.items_id}`).then((result)=>{
                                    setTaskData(result.data)
                                });
                              
                               })
                            }}>save</button><button onClick={()=>{item.modal=false}}>cancle</button></p>
                          }

                          
                          {
                            stateBox.userInformation.userID=== item.userID ? 
                            <div>
                               <span style={{fontSize:'11px'}}>😊</span>-
                               <button onClick={()=>{ 
                                  item.modal=true
                               }}>Edit</button>-
                               <button onClick={()=>{
                                  
                                  axios.put('/Comment/Delete',{data:{items_id:TaskData.items_id,CommentID:item.CommentID}}).then(()=>{
                                    axios.get(`/api/GetDetailText/${TaskData.items_id}`).then((result)=>{
                                        setTaskData(result.data)
                                    });
                                  })
                               }}>Delete</button>
                            </div>:null
                          }
                        </div>
                      </div>
                      </>
                    )
                  })
                }
        
                <div style={{height:'30px'}}></div>
        </div>
      </div> :null
    }



      <div className="cardArea">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, props.columns, setColumns)}>
          {currentItems.map(([columnId, column], index) => {
            const MYcolumnID = column._id
            
            //task 추가 enter event
            const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                TaskAddOnClick(mytext,stateBox.userInformation.userName,stateBox.userInformation.userProfile,MYcolumnID,setColumns,stateBox.userInformation.userID);
                (e.target as HTMLTextAreaElement).value = "";
              }
            };
            
            return (
              <div className="card" key={columnId}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "rgb(251, 241, 241)"
                            : "rgb(251, 241, 241)",
                        }}
                      >
                        <div className="cardText">
                          <p>&nbsp;<FontAwesomeIcon icon={faFilePen} />&nbsp;&nbsp;{column?.name}</p>
                        </div>

                        {column.items.map((item: TaskType, index: number) => {

                          const MYitemID = item.items_id; // 테스크  id

                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 15,
                                        margin: "15px",
                                        minHeight: "50px",
                                        boxShadow: "1px 1px 1px 1px lightgrey",
                                        backgroundColor: snapshot.isDragging
                                          ? "lightgray"
                                          : "white",
                                        color: "black",
                                        textAlign:"center",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div className="taskIcon">
                                        {/* 테스크 열기 */}
                                        <label className="penIcon" onClick={() => {
                                            setListID(MYcolumnID);                          
                                            setTaskID(MYitemID);
                                            setTaskModal(true)
                                            axios.get(`/api/GetDetailText/${MYitemID}`).then((result)=>{
                                              setTaskData(result.data)
                                            }) 
                                        }}><FontAwesomeIcon icon={faMagnifyingGlass}/> 열기</label>
        
                                      </div>

                                      <div className="taskContent" style={{marginBottom:'10px'}}>
                                       {column.items[index].content}
                                      </div>
                                     
                                      <div className="producer">
                                        <div className="producerBox">
                                          <img src={column.items[index].profile} alt="basicProfile"/>
                                          <p> {column.items[index].userName}</p> 
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                        
                        {/* 테스크추가 */}
                        <div className="addTask">
                            <input type="text" className="taskInput" name="content" placeholder="+ Add another task..." onKeyPress={onKeyPress}
                             onChange={(e :React.ChangeEvent<HTMLInputElement>)=>{setmyText(e.target.value)}}/>
                        </div>
                        
                        {/* 리스트 삭제버튼 */}
                        {
                          stateBox.userInformation.userID === column.ListProducer ?
                          <div className="trash">
                            <FontAwesomeIcon icon={faTrashCan} className="trashIcon" onClick={() => {ListDelete(setColumns,MYcolumnID)}}/>
                          </div>:<div style={{height:'30px'}}></div>
                        }
                        

                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      <ReactPaginate
        // breakLabel="..."
        nextLabel="▶"
        previousLabel="◀"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />

     </>
  );
};
