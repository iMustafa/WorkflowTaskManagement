import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { RootState, RootDispatch } from "../../redux/store";
import {
  CloseDialogs,
  EditTaskDispatcher,
} from "../../redux/actions/tasks.actions";
import { UpdateTask } from "../../providers/task.provider";

interface IEditTaskModalState {
  name?: string;
  description?: string;
  assignee?: string;
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
  btnContainer: {
    marginTop: 25,
  },
}));

const EditTaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch<RootDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const { show_edit_dialog, altering_task } = useSelector(
    (state: RootState) => state.task
  );
  const [form, setForm] = React.useState<IEditTaskModalState>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (!altering_task) return setIsReady(false);

    setForm({
      assignee: altering_task?.assignee,
      description: altering_task?.description,
      name: altering_task?.name,
    });
    setIsReady(true);
  }, [altering_task]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    },
    [form]
  );

  const handleClose = () => {
    dispatch(CloseDialogs());
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      // @ts-ignore
      const { _id, stage } = altering_task;

      await UpdateTask({ _id, stage, task: form });

      dispatch(EditTaskDispatcher({ _id, stage, task: form }));
      handleClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady)
    return (
      <Dialog open={show_edit_dialog} onClose={handleClose}>
        <div className={classes.loader}>
          <CircularProgress size={50} />
        </div>
      </Dialog>
    );

  return (
    <Dialog open={show_edit_dialog} onClose={handleClose}>
      <div className={classes.root}>
        <h1>Editing task: {altering_task?.name}</h1>

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
          <div className={classes.btnContainer}>
            <Button fullWidth color="primary" onClick={handleEdit}>
              Update
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default EditTaskModal;
