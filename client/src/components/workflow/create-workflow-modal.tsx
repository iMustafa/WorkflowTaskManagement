import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

import { CreateWorkflow } from "../../providers/workflow.provider";
import { AddWorkFlowAction } from "../../redux/actions/workflow.actions";
import { RootDispatch } from "../../redux/store";

interface CreateWorkflowModalProps {
  open: boolean;
  handleClose(): void;
}

const useStyles = makeStyles(() => ({
  root: {
    width: "400px",
    maxWidth: "800px",
    overflowY: "scroll",
    padding: 15,
    "& h1": {
      fontSize: 20,
      textAlign: "center",
    },
  },
  fieldContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch<RootDispatch>();
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, setFields] = React.useState({
    [uuidv4()]: "",
  });

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFields({ ...fields, [name]: value });
    },
    [fields]
  );

  const addField = () => {
    const _id = uuidv4();
    setFields({ ...fields, [_id]: "" });
  };

  const removeField = (_id: string) => {
    const _fields = { ...fields };
    delete _fields[_id];
    setFields(_fields);
  };

  const handleSubmit = async () => {
    const stages = Object.values(fields);
    try {
      setIsLoading(true);
      const _workflow = await CreateWorkflow({ name, stages });
      dispatch(AddWorkFlowAction(_workflow));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <div className={classes.root}>
        <h1>Create new workflow</h1>

        <React.Fragment>
          <TextField
            label="Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            fullWidth
            style={{ marginBottom: 20 }}
          />

          {Object.keys(fields).map((field: string, index: number) => (
            <div key={field} className={classes.fieldContainer}>
              <TextField
                label={`Pipeline State #${index}`}
                // @ts-ignore
                value={fields[field]}
                name={field}
                onChange={handleChange}
                fullWidth
              />

              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  removeField(field);
                }}
              />
            </div>
          ))}

          {!isLoading && (
            <Button fullWidth onClick={addField}>
              Add Pipeline Stage
            </Button>
          )}

          <Divider style={{ marginTop: 20, marginBottom: 20 }} />

          {isLoading ? (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          ) : (
            <Button color="primary" fullWidth onClick={handleSubmit}>
              Create Workflow
            </Button>
          )}
        </React.Fragment>
      </div>
    </Dialog>
  );
};

export default CreateWorkflowModal;
