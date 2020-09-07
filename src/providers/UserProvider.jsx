import React, { Component, createContext } from "react";

import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      console.log("onAuthStateChanged");
      this.setState({ user: userAuth });
      if (!userAuth) {
        this.setState({ displayName: null });
      }
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;