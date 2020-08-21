import React, { useContext } from "react";
import { Router } from "@reach/router";

import { UserContext } from "../providers/UserProvider";
import SignIn from "./SignIn";
import SignInAnonymously from "./SignInAnonymously";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

function Application() {
  const user = useContext(UserContext);
  return user ? (
    <div>
      <Router>
        <ProfilePage path="/" />
      </Router>
    </div>
  ) : (
    <div>
      <Router>
        <SignInAnonymously path="signInAnonymously" />
        <SignUp path="signUp" />
        <SignIn path="/" />
        <PasswordReset path="passwordReset" />
      </Router>
    </div>
  );
}
export default Application;
