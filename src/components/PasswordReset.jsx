import { Link } from "@reach/router";
import React, { useState } from "react";

import { auth } from "../firebase";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <div className="">
      <h1 className="">Reset your Password</h1>
      <div className="">
        <form action="">
          {emailHasBeenSent && (
            <div className="">An email has been sent to you!</div>
          )}
          {error !== null && <div className="">{error}</div>}
          <label htmlFor="userEmail" className="">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className=""
          />
          <button
            className=""
            onClick={(event) => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
        </form>
        <Link to="/" className="">
          &larr; back to sign in page
        </Link>
      </div>
    </div>
  );
};
export default PasswordReset;
