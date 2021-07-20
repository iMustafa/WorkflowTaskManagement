import React from "react";
import { Draggable } from 'react-beautiful-dnd'
import Card from "@material-ui/core/Card";
import { ITask } from "../../interfaces/task.interface";

interface TaskCardProps {
  task: ITask;
  index: number
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
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
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
