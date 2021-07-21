import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { RootState, RootDispatch } from "../../redux/store";
import TaskColumn from "./task-column";
import CreateTaskModal from "./create-task-modal";
import DeleteTaskModal from "./delete-task-modal";
import EditTaskModal from "./edit-task-modal";
import { GetWorkflowTasks } from "../../providers/workflow.provider";
import { LoadTasks } from "../../redux/actions/tasks.actions";
import { UpdateTaskStage } from "../../providers/task.provider";

const useStyles = makeStyles(() => ({
  loader: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TaskBoard = () => {
  const classes = useStyles();
  const dispatch = useDispatch<RootDispatch>();
  const { workflows, selected_workflow } = useSelector(
    (state: RootState) => state.workflow
  );
  const columns = useSelector((state: RootState) => state.task['columns']);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const _getWorkflowTasks = async () => {
      try {
        setIsLoading(true);
        const { stages, _id } = workflows[selected_workflow];
        const _tasks = await GetWorkflowTasks(_id);
        stages.forEach((stage) => {
          if (!Object.keys(_tasks).includes(stage))
            _tasks[stage] = {
              id: stage,
              list: [],
            };
        });

        dispatch(LoadTasks(_tasks));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    _getWorkflowTasks();
  }, [workflows, selected_workflow, dispatch]);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // @ts-ignore
    const start = columns[source.droppableId];

    // @ts-ignore
    const end = columns[destination.droppableId];

    if (start === end) {      
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      const _columns = { ...columns, [newCol.id]: newCol };
      dispatch(LoadTasks(_columns));
      return null;
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };
      const newEndList = end.list;
      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      const _columns = {
        ...columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      };

      const { _id } = columns[source.droppableId].list[source.index];
      const stage = destination.droppableId;

      dispatch(LoadTasks(_columns));

      await UpdateTaskStage({ _id, stage });
      return null;
    }
  };

  if (isLoading)
    return (
      <div className={classes.loader}>
        <CircularProgress size={40} />
      </div>
    );

  return (
    <React.Fragment>
      <CreateTaskModal />
      <DeleteTaskModal />
      <EditTaskModal />

      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            margin: "24px auto",
            width: "80%",
            gap: "8px",
          }}
        >
          {Object.values(columns).map((col: any) => (
            <TaskColumn col={col} key={col.id} />
          ))}
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default TaskBoard;
