import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ITask } from "../../interfaces/task.interface";
import { RootDispatch } from "../../redux/store";
import {
  ShowEditTaskDialog,
  ShowDeleteTaskDialog,
} from "../../redux/actions/tasks.actions";

interface TaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch<RootDispatch>();

  const handleEditTask = () => {
    dispatch(ShowEditTaskDialog({ task, index }));
  };

  const handleDeleteTask = () => {
    dispatch(ShowDeleteTaskDialog({ task, index }));
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <h1>{task.name}</h1>

            <IconButton onClick={handleEditTask}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={handleDeleteTask}>
              <DeleteIcon />
            </IconButton>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
