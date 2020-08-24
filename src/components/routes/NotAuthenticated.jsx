import { Router } from "@reach/router";
import React from "react";

import SignIn from "../SignIn";
import SignInAnonymously from "../SignInAnonymously";
import SignUp from "../SignUp";
import PasswordReset from "../PasswordReset";

function NotAuthenticated() {
  return (
    <Router>
      <SignInAnonymously path="signInAnonymously" />
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}

export default NotAuthenticated;
