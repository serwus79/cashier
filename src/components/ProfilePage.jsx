import React, { useContext } from "react";

import { auth } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import AnonymousProfile from "./profile/AnonymousProfile";
import Profile from "./profile/Profile";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const { isAnonymous } = user;

  console.log("profile:", user);
  return (
    <div className="">
      <div className="">
        {" "}
        {isAnonymous && <AnonymousProfile profile={user} />}
        {!isAnonymous && <Profile profile={user} />}
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
