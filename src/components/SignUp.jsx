import React, { useState } from "react";
import { Link, useNavigate } from "@reach/router";

import { auth, generateUserDocument } from "../firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      debugger;
      await generateUserDocument(user, { displayName });
      navigate("/");
      //   setEmail("");
      //   setPassword("");
      //   setDisplayName("");
    } catch (error) {
      setError("Error Signing up with email and password");
    }
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="">
      <h1 className="">Sign Up</h1>

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

          <label htmlFor="userEmail" className="">
            Email:
          </label>

          <input
            type="email"
            className=""
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />

          <label htmlFor="userPassword" className="">
            Password:
          </label>

          <input
            type="password"
            className=""
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />

          <button
            className=""
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>

        <p className="">or</p>

        <button className="">Sign In with Google</button>

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
export default SignUp;
