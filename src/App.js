import React from "react";

import Application from "./components/Application";
import Header from "./components/layout/Header";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Header />
      <Application />
    </UserProvider>
  );
}
export default App;
