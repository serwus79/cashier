import React from "react";

const AnonymousProfile = (props) => {
  const { uid } = props.profile;
  return (
    <div>
      <h2>Anonymous</h2>
      <p>
        You are logged in but you are still anonymous. If you sign out you loose
        all data!
      </p>
      <p>Your unique identifier: {uid}</p>
    </div>
  );
};
export default AnonymousProfile;
