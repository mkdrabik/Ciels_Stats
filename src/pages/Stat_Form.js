import { useState, useEffect, useRef } from "react";
import "./Stat_Form.css";
import { txtDB, auth } from "./txtConfig";
import { doc, setDoc } from "firebase/firestore";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Header from "../components/Header";

function StatForm() {
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
  const [win, setWin] = useState("");
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
    <body>
      <Header />
      <body class="overall">
        <div class="col">
          <h1 class="title">Form Options</h1>
          <br></br>
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
          <br></br>
          <br></br>
          <br></br>
          <button
            className="reset"
            onClick={(e) => {
              clear();
            }}
          >
            Reset
          </button>
        </div>

        <div className="col">
          <h1 class="title">Game</h1>
          <br></br>
          <br></br>
          <br></br>
          <input
            placeholder="Points"
            className="input-box"
            type="number"
            ref={p}
            onChange={handlePointChange}
          />
          <br></br>
          <br></br>
          <input
            placeholder="Rebounds"
            className="input-box"
            type="number"
            ref={r}
            onChange={handleReboundChange}
          />
          <br></br>
          <br></br>
          <input
            className="input-box"
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
            className="input-box"
            type="number"
            onChange={handleStealChange}
          />
          <br></br>
          <br></br>

          <input
            placeholder="Blocks"
            ref={b}
            className="input-box"
            type="number"
            onChange={handleBlockChange}
          />
          <br></br>
          <br></br>

          <input
            placeholder="Fouls"
            ref={f}
            className="input-box"
            type="number"
            onChange={handleFoulChange}
          />
          <br></br>
          <br></br>

          <select
            required
            name="outcome"
            id="outcome"
            placeholder=""
            onChange={handleWinChange}
            ref={w}
          >
            <option value="">Outcome?</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
          </select>
          <br></br>
          <br></br>

          <input
            placeholder="Opponent?"
            ref={o}
            type="text"
            className="input-box"
            onChange={handleOpponentChange}
          />
          <br></br>
          <br></br>

          <input
            required
            placeholder=""
            type="date"
            ref={d}
            className="input-box"
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
        </div>
        <div class="col">
          <h1 class="title">Account Options</h1>
          <br></br>
          <br></br>
          <br></br>
          <button
            className="si"
            onClick={(e) => {
              handleGoogle();
            }}
          >
            Sign In
          </button>
          <br></br>
          <br></br>
          <br></br>
          <button
            className="so"
            onClick={(e) => {
              handleSo();
            }}
          >
            Sign Out
          </button>
        </div>
      </body>
    </body>
  );

  //Handle Data entry functions
  function handleSeasonChange() {
    var e = document.getElementById("season");
    var value = e.options[e.selectedIndex].value;
    setSeason(value);
  }
  function handleWinChange() {
    var e = document.getElementById("outcome");
    var value = e.options[e.selectedIndex].value;
    setGame((g) => ({ ...game, win: value }));
  }
  function handlePointChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, points: e.target.value }));
    } else {
      e.target.value = 0;
    }
  }
  function handleDateChange(e, game) {
    setGame((g) => ({ ...game, date: e.target.value }));
  }
  function handleReboundChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, rebounds: e.target.value }));
    } else {
      e.target.value = 0;
    }
  }
  function handleStealChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, steals: e.target.value }));
    } else {
      e.target.value = 0;
    }
  }
  function handleAssistChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, assists: e.target.value }));
    } else {
      e.target.value = 0;
    }
  }
  function handleBlockChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, blocks: e.target.value }));
    } else {
      e.target.value = 0;
    }
  }
  function handleFoulChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, fouls: e.target.value }));
    } else {
      e.target.value = 0;
    }
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
    setWin("");
  }
}

export default StatForm;
