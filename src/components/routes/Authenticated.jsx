import { Router } from "@reach/router";
import React from "react";

import ProfilePage from "../ProfilePage";
import Projects from "../Projects";

function Authenticated() {
  return (
    <Router>
      <ProfilePage path="/profile" />
      <Projects path="/" />
    </Router>
  );
}

export default Authenticated;
