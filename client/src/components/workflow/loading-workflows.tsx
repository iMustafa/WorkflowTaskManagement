import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoadingWorkflows = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={30} />
    </div>
  );
};

export default LoadingWorkflows;
