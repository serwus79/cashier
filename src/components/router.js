import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainForm from "./main-form";
import App from "./app";
import NotFound from "./not-found";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainForm} />
      <Route path="/cashbox/:cashboxId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
