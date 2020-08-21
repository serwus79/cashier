import React, { useContext } from "react";

import { auth } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

const Header = () => {
  const user = useContext(UserContext);
  const { displayName, email, isAnonymous } = user || {};

  if (user) {
    return (
      <header className="">
        {isAnonymous ? (
          <span>Anonymous</span>
        ) : (
          <span>{displayName || email}</span>
        )}
        <button
          className=""
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign out
        </button>
      </header>
    );
  } else {
    return <header className="">Please sign in.</header>;
  }
};
export default Header;
