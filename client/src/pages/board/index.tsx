import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetWorkflows } from "../../providers/workflow.provider";
import LoadingWorkflows from "../../components/workflow/loading-workflows";
import NoWorkflowsWarning from "../../components/workflow/no-workflows-warning";
import CreateWorkflowButton from "../../components/workflow/create-workflow-btn";
import WorkflowsNavigator from "../../components/workflow/navigator";
import TaskBoard from "../../components/task/task-board";
import { RootDispatch, RootState } from "../../redux/store";
import { LoadWorkflowsAction } from "../../redux/actions/workflow.actions";
import { GetUsers } from "../../providers/user.provider";
import { LoadAccountUsers } from "../../redux/actions/user.actions";

const BoardPage = () => {
  const dispatch = useDispatch<RootDispatch>();
  const workflows = useSelector((state: RootState) => state.workflow?.workflows);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const _loadData = async () => {
      try {
        const _workflows = await GetWorkflows();
        const _users = await GetUsers();

        dispatch(LoadWorkflowsAction(_workflows));
        dispatch(LoadAccountUsers(_users));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    _loadData();
  }, [dispatch]);

  if (isLoading) return <LoadingWorkflows />;

  if (!workflows?.length && !isLoading) {
    return <NoWorkflowsWarning />;
  }

  return (
    <div>
      <WorkflowsNavigator />

      <TaskBoard />

      <CreateWorkflowButton showOnBottom />
    </div>
  );
};

export default BoardPage;
