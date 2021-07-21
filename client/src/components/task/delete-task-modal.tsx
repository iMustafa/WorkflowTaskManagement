import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState, RootDispatch } from "../../redux/store";
import {
  CloseDialogs,
  DeleteTaskDispatcher,
} from "../../redux/actions/tasks.actions";
import { DeleteTask } from "../../providers/task.provider";

const DeleteTaskModal = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { show_delete_dialog, altering_task } =
    useSelector((state: RootState) => state.task);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(CloseDialogs());
  };

  const handleDelete = async () => {
    try {
      // @ts-ignore
      await DeleteTask(altering_task?._id);

      // @ts-ignore
      const { stage, _id } = altering_task;
      
      dispatch(DeleteTaskDispatcher({ stage, _id }));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={show_delete_dialog} onClose={handleClose}>
      <h1>Are you sure you want to delete this task?</h1>
      <h1>Name: {altering_task?.name} </h1>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </Dialog>
  );
};

export default DeleteTaskModal;
