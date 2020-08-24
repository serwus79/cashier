import React, { useState } from "react";
import { Link } from "@reach/router";

import { auth, generateUserDocument } from "../firebase";

const SignInAnonynmous = () => {
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const signInAnonymously = (event) => {
    event.preventDefault();
    return auth
      .signInAnonymously()
      .then((user) => {
        generateUserDocument(user, { displayName });
        this.setState({ displayName });
      })
      .catch((error) => {
        setError("Error signing in anonymously!");
        console.error("Error signing in anonymously", error);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="">
      <h1 className="">Sign In Anonymously</h1>

      <div className="">
        {error !== null && <div className="">{error}</div>}
        <form className="">
          <label htmlFor="displayName" className="">
            Display Name:
          </label>

          <input
            type="text"
            className=""
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />

          <button
            className=""
            onClick={(event) => {
              signInAnonymously(event);
            }}
          >
            Sign in
          </button>
        </form>

        <p className="">
          Already have an account?{" "}
          <Link to="/" className="">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignInAnonynmous;
