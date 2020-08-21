import React, { useContext } from "react";

import { auth } from "../firebase";
import { UserContext } from "../providers/UserProvider";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const { displayName, email, isAnonymous, uid } = user;

  console.log("profile:", user);
  return (
    <div className="">
      <div className="">
        {" "}
        {isAnonymous && (
          <div>
            <h2 className="">Anonymous</h2>
            <p>
              You are logged in but you are still anonymous. If you sign out you
              loose all data!
            </p>
            <p>Your unique identifier: {uid}</p>
          </div>
        )}
        {!isAnonymous && (
          <div className="">
            <h2 className="">{displayName}</h2>
            <h3 className="">{email}</h3>
          </div>
        )}
      </div>
      <button
        className=""
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};
export default ProfilePage;
