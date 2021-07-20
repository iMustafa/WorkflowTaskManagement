import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { RootDispatch } from "../../redux/store";
import { SelectWorkflowStage } from "../../redux/actions/workflow.actions";
import { ShowCreateTaskModal } from "../../redux/actions/tasks.actions";

interface CreateTaskButtonProps {
  stageId: string;
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid #3f51b5",
    borderRadius: 8,
    color: "#3f51b5",
  },
}));

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ stageId }) => {
  const classes = useStyles();
  const dispatch = useDispatch<RootDispatch>();

  const handleClick = () => {
    dispatch(SelectWorkflowStage(stageId));
    dispatch(ShowCreateTaskModal());
  };

  return (
    <Button className={classes.root} onClick={handleClick}>
      <AddIcon />
      <Typography>Add Task</Typography>
    </Button>
  );
};

export default CreateTaskButton;
