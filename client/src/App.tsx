import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import BoardPage from "./pages/board";

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>

        <Route path="/board">
          <BoardPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
