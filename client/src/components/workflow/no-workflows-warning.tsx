import React from "react";
import { makeStyles } from "@material-ui/core";
import CreateWorkflowButton from "./create-workflow-btn";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    flexDirection: 'column',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const NoWorkflowsWarning = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Start by creating a new workflow</h1>
      <CreateWorkflowButton />
    </div>
  );
};

export default NoWorkflowsWarning;
