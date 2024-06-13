import { React } from "react";
import Header from "../components/Header";
import { auth } from "../pages/txtConfig";
import "./css/Account.css";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

function Account() {
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
      } catch (error) {
        alert(error);
      }
      /*
      try {
        await setDoc(doc(txtDB, "users", auth.currentUser.displayName), {
          Email: auth.currentUser.email,
        });
      } catch (error) {
        alert("Error uploading user");
      }
        */
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
      alert(auth.currentUser === null);
    } catch (error) {
      alert("Not logged out!");
    }
  };
  return (
    <body className="abg2">
      <Header />
      <body className="aoverall">
        <br />
        <br />
        <button
          className="si"
          onClick={(e) => {
            handleGoogle();
          }}
        >
          Sign In
        </button>
        <br />
        <br />
        <br />
        <br />
        <button
          className="so"
          onClick={(e) => {
            handleSo();
          }}
        >
          Sign Out
        </button>
        <br />
        <br />
        <br />
        <br />
        <p>
          *Gmail is only used to ensure those wanting to view stats are not
          robots.
        </p>
      </body>
    </body>
  );
}

export default Account;
