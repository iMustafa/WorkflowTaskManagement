import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { RootState, RootDispatch } from "../../redux/store";
import { SelectWorkflowAction } from "../../redux/actions/workflow.actions";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const WorkflowsNavigator = () => {
  const classes = useStyles();
  const dispatch = useDispatch<RootDispatch>()
  const { workflows, selected_workflow } = useSelector(
    (state: RootState) => state.workflow
  );
  

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const _workflow = workflows[newValue]._id;
    console.log(_workflow)
    dispatch(SelectWorkflowAction(newValue));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={selected_workflow}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          {workflows.map((workflow, index) => (
            <Tab
              key={workflow._id}
              label={workflow.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default WorkflowsNavigator;
