import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { RootState, RootDispatch } from "../../redux/store";
import { AddTask, HideCreateTaskModal } from "../../redux/actions/tasks.actions";
import { CreateTask } from "../../providers/task.provider";

interface ICreateTaskModalFormState {
  name: string;
  description: string;
  assignee: string;
}

const useStyles = makeStyles(() => ({
  root: {
    padding: "25px 15px",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CreateTaskModal = () => {
  const classes = useStyles();
  const [form, setForm] = React.useState<ICreateTaskModalFormState>({
    name: "",
    description: "",
    assignee: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch<RootDispatch>();

  const { selected_workflow, workflows, selected_stage } = useSelector(
    (state: RootState) => state.workflow
  );
  const open = useSelector((state: RootState) => state.task.show_create_modal);
  const users = useSelector((state: RootState) => state.user.users);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    },
    [form]
  );

  const handleClose = () => {
    dispatch(HideCreateTaskModal());
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const stage = selected_stage;
      const workflow = workflows[selected_workflow]._id;
      const payload = { ...form, stage, workflow };
      
      const _task = await CreateTask(payload);

      dispatch(AddTask({stage, task: _task}));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={classes.root}>
        <h3>Create new task: ({selected_stage})</h3>

        <Divider style={{ marginBottom: 20 }} />

        <TextField
          name="name"
          label="Name"
          onChange={handleChange}
          value={form.name}
          fullWidth
        />

        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          value={form.description}
          fullWidth
          multiline
          style={{ marginTop: 25 }}
        />

        <FormControl fullWidth style={{ marginTop: 25 }}>
          <InputLabel id="assignee-label">Assignee</InputLabel>
          <Select
            fullWidth
            labelId="assignee-label"
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={(e) => {
              setForm({ ...form, assignee: e.target.value as string });
            }}
          >
            {users?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isLoading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            color="primary"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: 25 }}
          >
            Create Task
          </Button>
        )}
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;
