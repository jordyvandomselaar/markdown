import React, { useContext, useEffect } from "react";
import { initializeFirebaseAuthUi } from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";
import PageTitle from "../PageTitle";
import { ToolbarTitle } from "rmwc/Toolbar";

const Login = () => {
  const user = useContext(UserContext);

  if (user) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    initializeFirebaseAuthUi("#ui");
  });

  return (
    <>
      <PageTitle>
        <ToolbarTitle>Welcome back!</ToolbarTitle>
      </PageTitle>
      <div id="ui" />
    </>
  );
};

export default Login;
