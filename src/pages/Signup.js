import { useState, useRef } from "react";
import { auth } from "./txtConfig";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Header from "../components/Header";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFN] = useState("");
  const [LastName, setLN] = useState("");
  const e = useRef("");
  const fn = useRef("");
  const ln = useRef("");

  const createNewUser = async (e) => {
    try {
      createUserWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
    } catch (err) {
      console.log(err);
    }
  };

  const logUserIn = async (e) => {
    try {
      signInWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
      alert("Hello");
    } catch (err) {
      console.log(err);
    }
  };
  const enablePersistence = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      alert("Persistence not set!");
    }
  };

  return (
    <>
      <Header />
      <input
        placeholder="Email"
        className="input-box"
        type="text"
        ref={e}
        onChange={handleEmailChange}
      />

      <br />
      <br />

      <input
        placeholder="First Name"
        className="input-box"
        type="text"
        ref={fn}
        onChange={handleFNChange}
      />
      <br />
      <br />

      <input
        placeholder="Last Name"
        className="input-box"
        type="text"
        ref={ln}
        onChange={handleLNChange}
      />

      <br />
      <br />

      <button
        className="so"
        onClick={(e) => {
          createNewUser();
        }}
      >
        Sign Up
      </button>

      <br />
      <br />

      <button
        className="so"
        onClick={(e) => {
          logUserIn();
        }}
      >
        Sign In
      </button>
    </>
  );

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleFNChange(e) {
    setFN(e.target.value);
  }
  function handleLNChange(e) {
    setLN(e.target.value);
  }
}

export default SignUp;
