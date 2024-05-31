import { useState, useEffect, useRef } from "react";
import "./App.css";
import { txtDB, auth } from "./txtConfig";
import { doc, setDoc } from "firebase/firestore";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [game, setGame] = useState({
    date: "",
    opponent: "",
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    fouls: 0,
    win: "",
  });
  const d = useRef("");
  const o = useRef("");
  const p = useRef(0);
  const r = useRef(0);
  const a = useRef(0);
  const s = useRef(0);
  const b = useRef(0);
  const f = useRef(0);
  const w = useRef("");
  const sea = useRef("");
  const [season, setSeason] = useState("");
  const [signedIn, setsignedIn] = useState(false);
  var emp = true;

  useEffect(() => {
    setGame({
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      fouls: 0,
      win: "",
      opponent: "",
      date: "",
    });
    clear();
  }, []);

  //Handle Data Upload
  const handleUpload = async () => {
    try {
      game.date.toString();
      await setDoc(doc(txtDB, season, game.date.toString()), {
        Points: Number(game.points),
        Assists: Number(game.assists),
        Rebounds: Number(game.rebounds),
        Opponent: game.opponent,
        Steals: Number(game.steals),
        Blocks: Number(game.blocks),
        Win: game.win,
        Fouls: Number(game.fouls),
      });
      alert("Data added successfully.");
    } catch (err) {
      if (
        err ===
        "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
      ) {
        alert("Contact Mason to log stats");
      } else {
        alert("Idk what happened");
      }
      emp = true;
    }
  };

  const handleGoogle = async (e) => {
    const provider = await new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in");
      setsignedIn(true);
    } catch (error) {
      alert("Error logging in");
    }

    try {
      await setDoc(doc(txtDB, "users", auth.currentUser.displayName), {
        Email: auth.currentUser.email,
      });
    } catch (error) {
      alert("Error uploading user");
    }
  };

  const handleSo = async (e) => {
    try {
      signOut(auth);
      alert("Successfully signed out");
      setsignedIn(false);
    } catch (error) {
      alert("Not logged out!");
    }
  };

  return (
    <section>
      <form>
        <br></br>
        <br></br>

        <button
          className="sub"
          onClick={(e) => {
            if (!signedIn) {
              alert("Sign in to log stats!");
            } else {
              filled();
            }
          }}
        >
          Submit
        </button>

        <button
          className="btn-clear"
          onClick={(e) => {
            clear();
          }}
        >
          Clear All
        </button>
        <br></br>
        <br></br>
        <button
          className="btn"
          onClick={(e) => {
            handleGoogle();
          }}
        >
          Sign In
        </button>

        <button
          className="btn-clear"
          onClick={(e) => {
            handleSo();
          }}
        >
          Sign Out
        </button>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <input
          placeholder="Points"
          className="new-item-form"
          type="number"
          ref={p}
          onChange={handlePointChange}
        />

        <br></br>
        <br></br>
        <input
          placeholder="Rebounds"
          className="new-item-form"
          type="number"
          ref={r}
          onChange={handleReboundChange}
        />

        <br></br>
        <br></br>
        <input
          className="new-item-form"
          placeholder="Assists"
          type="number"
          ref={a}
          onChange={handleAssistChange}
        />
        <br></br>
        <br></br>

        <input
          placeholder="Steals"
          ref={s}
          className="new-item-form"
          type="number"
          onChange={handleStealChange}
        />
        <br></br>
        <br></br>

        <input
          placeholder="Blocks"
          ref={b}
          className="new-item-form"
          type="number"
          onChange={handleBlockChange}
        />
        <br></br>
        <br></br>

        <input
          placeholder="Fouls"
          ref={f}
          className="new-item-form"
          type="number"
          onChange={handleFoulChange}
        />
        <br></br>
        <br></br>

        <input
          placeholder="Win?"
          ref={w}
          type="text"
          className="new-item-form"
          onChange={handleWinChange}
        />
        <br></br>
        <br></br>

        <input
          placeholder="Opponent?"
          ref={o}
          type="text"
          className="new-item-form"
          onChange={handleOpponentChange}
        />
        <br></br>
        <br></br>

        <input
          required
          placeholder=""
          type="date"
          ref={d}
          className="new-item-form"
          onChange={handleDateChange}
        />
        <br></br>
        <br></br>

        <select
          required
          name="season"
          id="season"
          placeholder=""
          onChange={handleSeasonChange}
          ref={sea}
        >
          <option value="">Which Season</option>
          <option value="AAU">AAU</option>
          <option value="IHM">IHM</option>
        </select>

        <br></br>
        <br></br>
        <br></br>
      </form>
    </section>
  );

  //Handle Data entry functions
  function handleSeasonChange() {
    var e = document.getElementById("season");
    var value = e.options[e.selectedIndex].value;
    setSeason(value);
  }
  function handlePointChange(e) {
    setGame((g) => ({ ...game, points: e.target.value }));
  }
  function handleReboundChange(e) {
    setGame((g) => ({ ...game, rebounds: e.target.value }));
  }
  function handleStealChange(e) {
    setGame((g) => ({ ...game, steals: e.target.value }));
  }
  function handleAssistChange(e) {
    setGame((g) => ({ ...game, assists: e.target.value }));
  }
  function handleBlockChange(e) {
    setGame((g) => ({ ...game, blocks: e.target.value }));
  }
  function handleFoulChange(e) {
    setGame((g) => ({ ...game, fouls: e.target.value }));
  }
  function handleWinChange(e) {
    setGame((g) => ({ ...game, win: e.target.value }));
  }
  function handleDateChange(e) {
    setGame((g) => ({ ...game, date: e.target.value }));
  }
  function handleOpponentChange(e) {
    setGame((g) => ({ ...game, opponent: e.target.value }));
  }

  //Checks to see if all fields are filled then calls handle upload
  function filled() {
    emp = false;
    for (let key in game) {
      if (game[key] === "" || game[key] === null) {
        emp = true;
        alert("Fill everything out");
        break;
      }
    }
    if (emp === false) {
      handleUpload();
      if (emp === false) {
        clear();
      } else {
        alert("Enter a valid date");
      }
    }
  }

  //Sets everything empty
  function clear() {
    p.current.value = "";
    r.current.value = "";
    a.current.value = "";
    f.current.value = "";
    s.current.value = "";
    b.current.value = "";
    d.current.value = "";
    w.current.value = "";
    o.current.value = "";
    sea.current.value = "";
    setGame({
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      fouls: 0,
      win: "",
      opponent: "",
    });
    setSeason("");
  }
}

export default App;
