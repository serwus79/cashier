import React, { useContext } from "react";

import { UserContext } from "../providers/UserProvider";
import Authenticated from "./routes/Authenticated";
import NotAuthenticated from "./routes/NotAuthenticated";

function Application() {
  const user = useContext(UserContext);
  if (user) {
    return <Authenticated />;
  }
  return <NotAuthenticated />;
}
export default Application;
