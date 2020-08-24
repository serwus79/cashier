import React, { useContext } from "react";

import { auth } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

const Header = () => {
  const user = useContext(UserContext);
  const { displayName, email, isAnonymous } = user || {};
  const signOut = async () => {
    await auth.signOut();
  };

  if (user) {
    return (
      <header>
        {isAnonymous ? (
          <span>Anonymous</span>
        ) : (
          <span>{displayName || email}</span>
        )}
        <button onClick={signOut}>Sign out</button>
      </header>
    );
  } else {
    return <header>Please sign in.</header>;
  }
};
export default Header;
