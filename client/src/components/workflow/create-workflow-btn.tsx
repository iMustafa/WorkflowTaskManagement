import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import CreateWorkflowModal from "./create-workflow-modal";

const useStyles = makeStyles(() => ({
  bottom: {
    position: "fixed",
    bottom: 15,
    right: 15,
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid #3f51b5",
    borderRadius: 8,
    color: "#3f51b5",
  },
}));

interface CreateWorkflowButtonProps {
  showOnBottom?: boolean;
}

const CreateWorkflowButton: React.FC<CreateWorkflowButtonProps> = ({
  showOnBottom,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <CreateWorkflowModal open={open} handleClose={handleClose} />

      <Button
        className={
          showOnBottom ? clsx(classes.root, classes.bottom) : classes.root
        }
        onClick={handleClose}
      >
        <AddIcon />
        <Typography>Create Workflow</Typography>
      </Button>
    </React.Fragment>
  );
};

export default CreateWorkflowButton;
