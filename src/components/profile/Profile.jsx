import React from "react";

const Profile = (props) => {
  const { displayName, email } = props.profile;

  return (
    <div>
      <h2>{displayName}</h2>
      <h3>{email}</h3>
    </div>
  );
};

export default Profile;
