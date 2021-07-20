import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IRegisterPayload } from "../../interfaces/auth.interfaces";
import { Register } from "../../providers/auth.provider";
import { RegisterUserAction } from "../../redux/actions/auth.actions";
import { RootDispatch } from "../../redux/store";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "40%",
    padding: 25,
    "& h3": {
      fontSize: 20,
      textAlign: "center",
    },
  },
  input: {
    marginBottom: 15,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
}));

const RegisterPage = () => {
  const dispatch = useDispatch<RootDispatch>();
  const history = useHistory();
  const classes = useStyles();

  const [form, setForm] = React.useState<IRegisterPayload>({
    name: "",
    email: "",
    password: "",
    createAccount: true,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    },
    [form]
  );

  const handleNavigation = () => {
    history.push("/login");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const _user = await Register(form);
      dispatch(RegisterUserAction(_user));
      localStorage.setItem("token", `Bearer ${_user.token}`);
      history.push("/board");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3">Register</Typography>

        <TextField
          className={classes.input}
          fullWidth
          name="name"
          label="Full Name"
          type="text"
          onChange={handleChange}
        />

        <TextField
          className={classes.input}
          fullWidth
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />

        <TextField
          className={classes.input}
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />

        {isLoading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            <Button fullWidth color="primary" onClick={handleSubmit}>
              Register
            </Button>

            <Button fullWidth color="secondary" onClick={handleNavigation}>
              Back to Login
            </Button>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default RegisterPage;
