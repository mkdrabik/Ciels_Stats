import { useState } from "react";
import "./Stat_Form.css";
import Header from "../components/Header";
import { txtDB, auth } from "./txtConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

function Stats() {
  const [pts, setPts] = useState([]);
  const [wins, setWins] = useState([]);

  async function qC() {
    try {
      if (auth.currentUser != null) {
        const colRef = collection(txtDB, "IHM");
        const q = await query(colRef, orderBy("Points", "asc"), limit(5));
        const games = await getDocs(q);
        games.forEach((game) => {
          setPts((p) => [...p, game.data().Points]);
          setWins((w) => [...w, game.data().Win]);
        });
      } else {
        alert("Provide Gmail to view stats");
      }
    } catch (err) {
      if (
        err ===
        "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
      ) {
        alert("Provide Gmail to view stats");
      } else {
        alert("Idk what happened lmao");
      }
    }
  }

  return (
    <div>
      <Header />
      <button
        onClick={(e) => {
          qC();
        }}
      >
        Stats
      </button>
      <br></br>
      <button
        onClick={(e) => {
          clear();
        }}
      >
        clear
      </button>
      <br></br>
      <ol>
        {pts.map((p) => (
          <li>{p}</li>
        ))}
      </ol>

      <ol>
        {wins.map((w) => (
          <li>{w}</li>
        ))}
      </ol>
    </div>
  );

  function clear() {
    setWins([]);
    setPts([]);
  }
}

export default Stats;
