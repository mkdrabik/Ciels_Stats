import { useState, useRef, useEffect } from "react";
import { auth } from "./txtConfig";
import "./css/Account.css";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFN] = useState("");
  const [LastName, setLN] = useState("");
  const e = useRef("");
  const fn = useRef("");
  const ln = useRef("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (auth.currentUser === null) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, []);
  const createNewUser = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
      setUser(true);
      alert("New user created and logged in");
      clear();
    } catch (err) {
      console.log(err);
      if (err.toString().includes("email-already-in-use"))
        alert("Email already in use");
      else if (err.toString().includes("invalid-email")) {
        alert("Please enter a valid email");
      } else {
        console.log(err);
      }
    }
  };

  const logUserIn = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, firstName + LastName);
      enablePersistence();
      setUser(true);
      alert("Logged in");
      clear();
    } catch (err) {
      console.log(err);
      if (err.toString().includes("credential")) {
        alert(
          "Please ensure your email is correct and please type your name in the same way you typed it when you signed up."
        );
      } else {
        console.log(err);
      }
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
    <body className="abg2">
      <Header />
      <br />
      <br />

      <div className="aoverall">
        {user && (
          <span>
            <Link to="/stats">
              <button className="si">TO STATS</button>
            </Link>
          </span>
        )}
        {!user && (
          <input
            placeholder="Email"
            className="input-box"
            type="text"
            ref={e}
            onChange={handleEmailChange}
          />
        )}
        <br />
        <br />

        {!user && (
          <input
            placeholder="First Name"
            className="input-box"
            type="text"
            ref={fn}
            onChange={handleFNChange}
          />
        )}
        <br />
        <br />
        {!user && (
          <input
            placeholder="Last Name"
            className="input-box"
            type="text"
            ref={ln}
            onChange={handleLNChange}
          />
        )}

        <p>
          *Email is only used to ensure those wanting to view stats are not
          robots.
        </p>
        <p>
          *Your name is used to log you back in if you log out. Please ensure
          there are no extra spaces and the first letter is capital.
        </p>

        {!user && (
          <button
            className="si2"
            onClick={(e) => {
              createNewUser();
            }}
          >
            Sign Up
          </button>
        )}
        <br />
        <br />
        {!user && (
          <button
            className="si2"
            onClick={(e) => {
              logUserIn();
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </body>
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
  function clear() {
    fn.current.value = "";
    ln.current.value = "";
    e.current.value = "";
  }
}

export default SignUp;
