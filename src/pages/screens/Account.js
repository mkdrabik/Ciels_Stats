import { React, useState, useEffect } from "react";
import { txtDB, auth } from "../txtConfig";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import Header from "../../components/Header";

import "../css/Account.css";

function Account() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (auth.currentUser === null) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, []);
  //Handles logging in with Google Account
  const handleGoogle = async (e) => {
    if (auth.currentUser) {
      alert("Already logged in");
    } else {
      const provider = await new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      try {
        await signInWithPopup(auth, provider);
        alert("Logged in");
        enablePersistence();
        setUser(true);
      } catch (error) {
        alert(error);
      }
      try {
        await setDoc(doc(txtDB, "users", auth.currentUser.displayName), {
          Email: auth.currentUser.email,
        });
      } catch (error) {
        alert("Error uploading user");
      }
    }
  };

  //function to enable local storage to remember user
  const enablePersistence = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      alert("Persistence not set!");
    }
  };

  //Logs the user out of Google account
  const handleSo = async (e) => {
    try {
      await signOut(auth);
      alert("Successfully signed out");
      window.location.reload();
    } catch (error) {
      alert("Not logged out!");
    }
  };
  return (
    <body className="acc-bg">
      <Header />
      <div className="acc-ovrl">
        <br />
        <br />
        {!user && (
          <button className="acc-si" onClick={handleGoogle}>
            Gmail
          </button>
        )}
        <br />
        <br />
        {!user && (
          <span>
            <Link to="/su">
              <button className="acc-si">Email</button>
            </Link>
          </span>
        )}

        <br />
        <br />
        {user && (
          <button className="acc-so" onClick={handleSo}>
            Sign Out
          </button>
        )}
        <br />
        <br />
        <br />
        <br />

        <p>
          *Email is only used to ensure those wanting to view stats are not
          robots.
        </p>
      </div>
    </body>
  );
}

export default Account;
