import axios from "axios";
import {ListType} from '../common/TypeBox'

const onDragEnd = (result: any, columns: ListType[], setColumns: Function) => {
  
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]; //  A박스
    const destColumn = columns[destination.droppableId]; // B박스
    const sourceItems = [...sourceColumn.items]; // A 박스 items
    const destItems = [...destColumn.items]; // B 박스 items
    const [removed] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, removed); // B 박스 items 종착
    axios.post("/api/Renewal", {
      firstBox: sourceColumn._id,
      firstContent: sourceItems,
      afterBox: destColumn._id,
      afterContent: destItems,
    });
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
    axios.post("/api/Renewal2", { firstBox: column._id, firstContent: copiedItems });
  }
};

export default onDragEnd;
