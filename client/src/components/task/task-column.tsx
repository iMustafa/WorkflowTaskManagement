import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./task-card";
import CreateTaskButton from "./create-task-button";
import { ITask } from "../../interfaces/task.interface";

interface TaskColumnProps {
  col: {
    id: string;
    list: ITask[];
  };
}

const TaskColumn: React.FC<TaskColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CreateTaskButton stageId={id} />
          <h2>{id}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "120px",
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
